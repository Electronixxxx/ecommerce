import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

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
        const payload = jwt.verify(token, process.env.JWT_SECRET as string);

        if (payload.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized.' });
        }

        req.admin = payload;
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ message: 'Invalid authorization token.' });
    }
};

export const encodeAdminJwt = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.body.id;
    const userName = req.body.name;
    const adminPayload = {
        role: 'admin',
        userId,
        userName,
    };

    const token = jwt.sign(adminPayload, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
    });

    res.setHeader('Authorization', token);
    next();
};
