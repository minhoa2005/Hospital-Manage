import express from "express";
import type { User, tempUser } from "./user.ts";

declare global {
    namespace Express {
        interface Request {
            user?: User & { iat?: number | undefined, exp?: number | undefined };
        }
    }
}