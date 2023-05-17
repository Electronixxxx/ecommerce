import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

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
        );

        req.user = {
            customerID: payload.userId,
        };
        next();
    } catch (error) {
        console.error('Error verifying JWT token:', error);
        return res.status(403).json({ message: 'Forbidden' });
    }
};

export const encodeUserJWT = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.body.id;
    const userName = req.body.name;

    const userPayload = {
        role: 'user',
        userId,
        userName,
    };

    const token = jwt.sign(userPayload, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
    });

    res.setHeader('Authorization', token);
    next();
};
