import User from "../models/User";
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';

export interface IPayload {
    _id: string;
    iat: number;
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return next('Please login to access the data');
        }
        const payload = jwt.verify(token, process.env.JWT_TOKEN || 'dummy_token') as IPayload;
        req.user = payload._id;
        next();
    } catch (error) {
        return next('Please login to access the data');
    }
}