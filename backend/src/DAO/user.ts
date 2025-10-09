
import { setCookie, clearCookie } from "../config/cookie.js";
import { connect, sql } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middleware/jwt.js";
import type { Request, Response } from "express";

// const { setCookie, clearCookie } = require('../config/cookie');
// const { connect, sql } = require('../config/db');
// const bcrypt = require('bcryptjs');
// const { generateToken } = require('../middleware/jwt');
let pool: any;
connect().then((result) => pool = result).catch((error) => console.log("Error:", error));

const userDAO = {
    register: async (req: Request, res: Response) => {
        const transaction = new sql.Transaction(pool);
        try {
            const { data } = req.body;
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(data.password, salt);
            await transaction.begin();
            const request = new sql.Request(transaction)
            const result: any = await request.query(`
                insert into User(fullName, email, passwordHash, dateOfBirth, createdAt)
                OUTPUT INSERTED.UserID
                values ('${data.fullName}, ${data.email}', '${hash}', ${data.dateOfBirth}, ${data.createdAt})
            `);
            console.log(result);
            if (result.rowsAffected[0] > 0) {
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
            const { data } = req.body;
            // console.log("1", req.cookies);
            const user: any = await pool!.request().query(`
                select u.email, u.id, r.roleName from [User] u
                join UserRole ur on u.id = ur.userId
                join Roles r on r.id = ur.RoleId
                where u.email = '${data.email}'
                `);
            if (user.recordsets.length <= 0) {
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
            setCookie(res, 'token', token);
            return res.status(200).json({
                success: true,
                user: {
                    username: user.recordset[0].email,
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
            console.log("User from token:", user);
            const result = await pool!.request().query(`select * from Users where UserID = ${user.id}`);
            if (result.recordset.length <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "User not found"
                });
            }
            return res.status(200).json({
                success: true,
                user: req.user
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error' + error
            })
        }
    }
}


export default userDAO