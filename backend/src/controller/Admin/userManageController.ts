import type { Request, Response } from "express"
import userManageService from "../../service/Admin/userManageService.js";

const userManageController = {
    getAllUser: async (req: Request, res: Response) => {
        try {
            const result = await userManageService.getAllUser();
            if (result.success) {
                return res.status(200).json(result);
            }
            return res.status(500).json(result);
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: error
            })
        }
    },

    getUserDetailById: async (req: Request, res: Response) => {
        try {
            const id: number = parseInt(req.params.id!);

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid user ID'
                });
            }
            const result = await userManageService.getUserDetailById(id);
            console.log(result)
            if (result.success) {
                return res.status(200).json(result);
            }
            return res.status(404).json(result);
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: error
            })
        }
    },

    resetPassword: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await userManageService.resetPassword(parseInt(id!));
            if (result.success) {
                return res.status(200).json({
                    success: true
                })
            }
            return res.status(result?.status || 500).json({
                success: false,
                message: result?.message
            })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error
            })
        }
    },

    disableAccount: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid user ID'
                });
            }
            const result = await userManageService.disableAccount(parseInt(id));
            if (result.success) {
                return res.status(200).json({
                    success: true,
                })
            }
            return res.status(result?.status || 500).json({
                success: false,
                message: result?.message
            })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error
            })
        }
    }
}

export default userManageController;