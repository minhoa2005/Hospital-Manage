import { connect, sql } from '../../config/db.js';


let pool: any;
connect().then((result) => pool = result).catch((error) => console.log(error));

const userManageService = {
    getAllUser: async () => {
        try {
            const result = await pool.request().query(`SELECT u.fullName,u.email,r.roleName FROM [User] u 
                JOIN UserRole ur ON  u.id = ur.userId 
                JOIN Roles r on ur.roleId = r.id`);
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
                SELECT u.fullName,u.email,r.roleName FROM [User] u 
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
    }
}

export default userManageService;