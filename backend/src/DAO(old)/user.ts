
import { setCookie, clearCookie } from "../config/cookie.js";
import { connect, sql } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken, shortToken, verifyToken } from "../middleware/jwt.js";
import type { Request, Response } from "express";
import { sendOtp } from "../autoMail/otp.js";
import "dotenv/config"
// const { setCookie, clearCookie } = require('../config/cookie');
// const { connect, sql } = require('../config/db');
// const bcrypt = require('bcryptjs');
// const { generateToken } = require('../middleware/jwt');
const JWT_COOKIE_NAME: string = process.env.JWT_COOKIE_NAME!;
let pool: any;
connect().then((result) => pool = result).catch((error) => console.log("Error:", error));

const userDAO = {
    register: async (req: Request, res: Response) => {
        const transaction = new sql.Transaction(pool);
        try {
            const { data } = req.body;
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(data.password, salt);
            const createdAt = new Date();
            data.createdAt = createdAt;
            console.log("Data:", data);
            await transaction.begin();
            const request = new sql.Request(transaction)
            request.input('fullName', data.fullName);
            request.input('email', data.email);
            request.input('passwordHash', hash);
            request.input('dateOfBirth', data.dateOfBirth ? new Date(data.dateOfBirth) : null);
            request.input('createdAt', createdAt);
            const result: any = await request.query(`
                INSERT INTO [User] (fullName, email, passwordHash, dateOfBirth, createdAt)
                OUTPUT INSERTED.id
                VALUES (@fullName, @email, @passwordHash, @dateOfBirth, @createdAt)
            `);
            console.log("Result:", result);
            const requestRole = new sql.Request(transaction)
            const userId = result.recordset[0].id;
            requestRole.input('userId', userId)
            const setRole: any = await requestRole.query(`
                Insert into UserRole(roleId, userId)
                values(5, @userId)
                `)
            if (result.rowsAffected[0] > 0 && setRole.rowsAffected[0] > 0) {
                await transaction.commit();
                return res.status(200).json({
                    success: true
                })
            }
            else {
                await transaction.rollback();
                return res.status(500).json({
                    success: false
                })
            }
        }
        catch (error) {
            await transaction.rollback();
            console.log('Error', error);
            return res.status(500).json({
                success: false,
                message: "Error" + error
            });
        }
    },

    login: async (req: Request, res: Response) => {
        try {
            const { data }: any = req.body;
            const checkEmail: any = await pool!.request().input("email", data.email).query(`
                    select * from [User] where email = @email  
                `);
            if (checkEmail.recordset.length <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Email not found'
                })
            }
            const user: any = await pool!.request().input("email", data.email).query(`
                select u.email, u.id, r.roleName, u.passwordHash from [User] u
                join UserRole ur on u.id = ur.userId
                join Roles r on r.id = ur.RoleId
                where u.email = @email
                `);
            if (user.recordset.length <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "User not found"
                });
            }
            const checkPassword: boolean = await bcrypt.compare(data.password, user.recordset[0].passwordHash);
            if (!checkPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Wrong password"
                });
            }
            const token = generateToken({
                email: user.recordset[0].email,
                id: user.recordset[0].id,
                role: user.recordset[0].roleName
            });
            setCookie(res, JWT_COOKIE_NAME, token, { maxAge: 24 * 60 * 60 * 1000 });
            return res.status(200).json({
                success: true,
                user: {
                    email: user.recordset[0].email,
                    role: user.recordset[0].roleName
                }
            })
        }
        catch (error) {
            console.log('Error', error);
            return res.status(500).json({
                success: false,
                message: "Error" + error
            });
        }
    },

    logout: async (req: Request, res: Response) => {
        try {
            clearCookie(res, 'token');
            clearCookie(res, 'user');
            return res.status(200).json({
                success: true
            })
        }
        catch (error) {
            return {
                success: false,
                message: error
            }
        }
    },

    auth: async (req: Request, res: Response) => {
        try {
            const user = req.user;
            const result = await pool!.request().query(`select * from [User] where id = ${user?.id}`);
            if (result.recordset.length <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "User not found"
                });
            }
            return res.status(200).json({
                success: true,
                user: {
                    email: req.user?.email,
                    role: req.user?.role
                }
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Error' + error
            })
        }
    },
    //Forgot password

    createOtp: async (req: Request, res: Response) => {
        try {
            const { data } = req.body;
            const checkEmail = await pool.request().input("email", data.email).query(`
                    select id from [User] where email = @email
                `)
            if (checkEmail.recordset.length <= 0) {
                return res.status(401).json({
                    success: false,
                    message: 'Can not find an user with that email'
                })
            }
            const userId = checkEmail.recordset[0].id;
            if (userId) {
                const request = pool.request();
                let otp = Math.floor(Math.random() * (999999 - 100000)) + 100000;
                const createdAt = new Date();
                const expiredAt = new Date(createdAt.getTime() + 5 * 60 * 1000);
                //check if a same OTP is in the database and it is not expire yet
                const checkOtp = await request.query(`select top 1 * from OTP where code = ${otp} and expiredAt > GETDATE() and used = 0 order by createdAt DESC`);
                if (checkOtp.recordset.length > 0) {
                    otp = otp - 1 || otp + 1
                }
                const limitOtp = await request.input("time", sql.DateTime, new Date(createdAt.getTime() - 2 * 60 * 1000)).query(`select top 1 * from OTP where createdAt > @time and used = 0 order by createdAt DESC`);
                if (limitOtp.recordset.length > 0) {
                    return res.status(400).json({
                        success: false,
                        message: 'Only 1 OTP for each 2 minutes'
                    })
                }
                request.input("createdAt", sql.DateTime, createdAt);
                request.input("expiredAt", sql.DateTime, expiredAt);
                request.input("userId", parseInt(userId));
                request.input("otp", otp);
                await request.query(`
                        insert into OTP(code, used, userId, createdAt, expiredAt)
                        values(@otp, 0, @userId, @createdAt, @expiredAt)
                    `)
                const sendMail = await sendOtp(data.email, otp);
                if (sendMail) {
                    const tempToken = shortToken({ email: data.email, id: userId }, '5m')
                    return res.status(200).json({
                        success: true,
                        token: tempToken
                    })
                }
                return res.status(401).json({
                    success: false,
                    message: 'Email service is not working'
                })
            }
            else {
                return res.status(401).json({
                    success: false,
                    message: 'Can not find an user with that email'
                })
            }
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal Error: ' + error
            })
        }
    },

    verifyOtp: async (req: Request, res: Response) => {
        try {
            const { data } = req.body;
            if (req.user?.id === undefined) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized'
                })
            }
            if (req.user?.email === undefined) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized'
                })
            }
            const checkOtp = await pool.request().input("otp", data.otp).query(`select top 1 * from otp where code = @otp`);
            if (checkOtp.recordset.length < 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Wrong OTP'
                })
            }
            await pool.request().input('otp', data.otp).query('update OTP set used = 1 where code = @otp');
            const tempToken = shortToken({ email: req.user?.email, id: req.user?.id }, '5m');
            return res.status(200).json({
                success: true,
                token: tempToken
            })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal Error: ' + error
            })
        }
    },

    recoverPassword: async (req: Request, res: Response) => {
        try {
            const { data } = req.body;
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(data.password, salt);
            await pool.request().input("passwordHash", passwordHash).query(`update [User] set passwordHash = @passwordHash where id = ${req.user?.id}`);
            return res.status(200).json({
                success: true,
            })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal Error: ' + error
            })
        }
    }
}


export default userDAO