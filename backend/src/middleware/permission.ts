import type { NextFunction, Request, Response } from "express";

const checkPermission = (permission: Array<string>) => (req: Request, res: Response, next: NextFunction) => {
    const userRole: string = req.user.role;
    if (!req.user || !req.user.role) {
        return res.status(401).json({ message: 'Authentication required.' });
    }
    if (permission.includes(userRole)) {
        next();
    }
    else {
        return res.status(403).json({
            success: false,
            message: 'Forbidden: Insufficient role permissions.'
        })
    }
}

export { checkPermission }