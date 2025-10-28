import bcrypt from 'bcryptjs';
import { connect, sql } from '../../config/db.js';
import { sendResetPassword } from '../../autoMail/otp.js';


let pool: any;
connect().then((result) => pool = result).catch((error) => console.log(error));

const userManageService = {
    getAllUser: async () => {
        try {
            const result = await pool.request().query(`
                SELECT u.fullName,u.email,r.roleName, u.id FROM [User] u 
                JOIN UserRole ur ON  u.id = ur.userId 
                JOIN Roles r on ur.roleId = r.id
                `);
            return {
                success: true,
                data: result.recordset
            };
        }
        catch (error) {
            return {
                success: false,
                error: error
            };
        }
    },

    getUserDetailById: async (id: number) => {
        try {
            const result = await pool.request().input('id', id).query(
                `
                SELECT u.id, u.fullName,u.email,r.roleName, u.gender, u.dateOfBirth, u.createdAt, u.updatedAt FROM [User] u
                JOIN UserRole ur ON  u.id = ur.userId
                JOIN Roles r on ur.roleId = r.id
                where u.id = @id
                `
            )
            if (result.recordset.length > 0) {
                return {
                    success: true,
                    data: result.recordset[0]
                };
            }
            return {
                success: false,
                message: 'Could not find user'
            };
        }
        catch (error) {
            return {
                success: false,
                message: error
            }
        }
    },

    resetPassword: async (id: number) => {
        try {
            const newPassword: number = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
            const user = await pool.request().query(`
                        SELECT email FROM [User] WHERE id = ${id}
                `)
            if (user.recordset.length <= 0) {
                return {
                    success: false,
                    status: 404,
                    message: 'Could not find this user'
                }
            }
            const salt = await bcrypt.genSalt(10);
            const passwordHash: string = await bcrypt.hash(newPassword.toString(), salt);
            const updatePassword = await pool.request().input('id', id).input('passwordHash', passwordHash).query(`
                        UPDATE [User]
                        SET passwordHash = @passwordHash
                        WHERE id = @id
                `)
            if (updatePassword.rowsAffected && updatePassword.rowsAffected[0] > 0) {
                await sendResetPassword(user.recordset[0].email, newPassword);
                return {
                    success: true,
                    message: 'Password updated'
                };
            } else {
                return {
                    success: false,
                    message: 'Could not update password'
                };
            }
        }
        catch (error) {
            console.log(error)
            return {
                success: false,
                message: error
            }
        }
    },

    disableAccount: async (id: number) => {
        try {
            const checkUser = await pool.request().query(`select * from [User] where id = ${id}`);
            if (checkUser.recordset.length <= 0) {
                return {
                    status: 404,
                    success: false,
                    message: 'Could not find this user'
                }
            }
        }
    }
}

export default userManageService;