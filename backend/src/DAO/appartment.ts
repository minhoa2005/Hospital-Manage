import type { Request, Response } from "express";
import { connect } from "../config/db.js";


let pool: any;
connect().then((result) => pool = result).catch((error: unknown) => console.log(error));
const appartmentDao = {
    getAll: async (req: Request, res: Response) => {
        try {
            const result = await pool!.request().query('Select * from Departments');
            return res.status(200).json({
                success: true,
                data: result
            })
        }
        catch (error) {
            return res.status(404).json({
                success: false,
                message: 'error' + error
            })
        }
    },
    getById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await pool!.request().query(`select * from Departments where DepartmentID = ${id}`);
            return res.status(200).json({
                success: true,
                data: result.recordset
            })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error:' + error
            })
        }
    },
    updateDepartment: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const data = req.body;
            console.log(id, data)
            const result: any = await pool!.request().query(`
                update Departments
                set Name = '${data.name}', Location = '${data.location}', PhoneNumber = '${data.phoneNumber}'
                where DepartmentID = ${id}
                `);

            if (result.rowsAffected[0] > 0) {
                return res.status(200).json({
                    success: true
                })
            }
            else {
                return res.status(500).json({
                    success: false
                })
            }
            // const result = await pool.request().query()
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'error' + error
            })
        }
    }
}

export default appartmentDao