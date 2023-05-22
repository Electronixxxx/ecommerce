import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { DatabaseHelper } from '../DatabaseHelper';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
export const changePassword = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;

        if (!token) {
            return res.status(401).json({ message: 'Invalid or broken link' });
        }
        const { id } = jwt.verify(token, process.env.JWT_SECRET as string) as {
            id: string;
		};
        const hashedPassword = await bcrypt.hash('abracadabra', 10);
        await DatabaseHelper.query(
            `UPDATE Users SET password='${hashedPassword}' WHERE id='${id}'`
		);
		return res.status(200).json({message: 'Password reset successfully'})
    } catch (error) {
        return res
            .status(200)
            .json({ message: 'Something went wrong reseting your password' });
    }
};
