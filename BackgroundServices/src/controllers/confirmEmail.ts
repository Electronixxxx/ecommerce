import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { DatabaseHelper } from '../DatabaseHelper';

export const confirmEmail = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;
        if (!token) {
            return res.status(401).json({ message: 'Invalid Link' });
        }

		const { id }= jwt.verify(token, process.env.JWT_SECRET as string) as {id: string};
        await DatabaseHelper.query(
            `UPDATE Users SET approved=1 WHERE id='${id}'`
        );
        return res
            .status(200)
            .json({ message: 'Email confirmed successfully' });
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Something went wrong confirming email', error });
    }
};
