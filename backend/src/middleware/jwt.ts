// const jwt = require('jsonwebtoken');
// const { JWT_COOKIE_NAME } = require('../config/cookie');
import jwt from "jsonwebtoken";
import type { StringValue } from "ms"
import type { Response, Request, NextFunction } from "express";
import type { User } from "../type/user.js";
import userDAO from "../DAO(old)/user.js";
import "dotenv/config"
const JWT_SECRET: string = process.env.JWT_SECRET!;
const JWT_EXPIRE: StringValue = '1d';
const JWT_COOKIE_NAME: string = process.env.JWT_COOKIE_NAME!;

interface MyPayLoad extends jwt.JwtPayload {
    id: number,
    email: string,
    role?: string
}

const generateToken = (user: User): string => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role
    }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.[JWT_COOKIE_NAME!] || req.body?.data?.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No token provided.'
        });
    }
    try {
        const decode = jwt.verify(token, JWT_SECRET) as MyPayLoad;
        const myDecode: User & { iat?: number | undefined, exp?: number | undefined } = decode;
        console.log("Decode token: ", decode);
        req.user = myDecode;
        next();
    }
    catch (error) {
        userDAO.logout(req, res);
        return res.status(401).json({
            success: false,
            message: 'Invalid Token.'
        })
    }
}

const shortToken = (user: User, expire: StringValue = '1d') => {
    return jwt.sign({
        id: user.id,
        email: user.email,
    }, JWT_SECRET, { expiresIn: expire })
}

export { verifyToken, shortToken, generateToken, JWT_COOKIE_NAME, JWT_EXPIRE, JWT_SECRET }