import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });


interface userPayload {
    id: string;
    email: string;
    role: string;
    approved: boolean;
    iat: number;
    exp: number;
}

export const authenticateUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as userPayload;

        req.body.user = payload
        next();
    } catch (error) {
        console.error('Error verifying JWT token:', error);
        return res.status(403).json({ message: 'Forbidden' });
    }
};
