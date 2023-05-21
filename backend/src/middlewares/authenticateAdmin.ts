import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { boolean } from 'joi';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface userPayload {
    id: string;
    email: string;
    role: string;
    approved: boolean;
    iat: number;
    exp: number;
}

export const authenticateAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization;
    if (!token) {
        return res
            .status(401)
            .json({ message: 'Authorization token missing.' });
    }

    try {
        const payload = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET as string) as userPayload
        if (payload.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized.' });
        }
        req.body.user = payload;
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ message: 'Invalid authorization token.' });
    }
};

export const encodeAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.body.id;
    const userName = req.body.name;
    const payload = {
        role: 'admin',
        userId,
        userName,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
    });

    res.setHeader('Authorization', token);
    next();
};
