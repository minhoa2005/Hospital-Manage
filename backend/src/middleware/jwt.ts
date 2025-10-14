// const jwt = require('jsonwebtoken');
// const { JWT_COOKIE_NAME } = require('../config/cookie');
import jwt from "jsonwebtoken";
import type { StringValue } from "ms"
import { JWT_COOKIE_NAME } from "../config/cookie.js";
import type { Response, Request, NextFunction } from "express";
import type { tempUser, User } from "../type/user.js";
import userDAO from "../DAO/user.js";
const JWT_SECRET: string = 'project';
const JWT_EXPIRE: StringValue = '1d';

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
        const decode: string | object = jwt.verify(token, JWT_SECRET);
        console.log('Decoded token:', decode);
        req.user = decode;
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

const shortToken = (user: tempUser, expire: StringValue = '1d') => {
    return jwt.sign({
        id: user.id,
        email: user.email,
    }, JWT_SECRET, { expiresIn: expire })
}

export { verifyToken, shortToken, generateToken, JWT_COOKIE_NAME, JWT_EXPIRE, JWT_SECRET }