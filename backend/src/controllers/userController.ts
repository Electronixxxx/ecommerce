import { Request, RequestHandler, Response } from 'express';
import { v4 as uid } from 'uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { DatabaseHelper } from '../DatabaseHelper';
import { User, ExtendedRequest } from '../Interfaces';

//Add new User
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password, address } = req.body;
        const id = uid();
        const hashedPassword = await bcrypt.hash(password, 10);

        await DatabaseHelper.exec('RegisterUser', {
            id,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            address,
        });

        const token = jwt.sign(
            { id, email },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );
        res.status(200).json({
            message: 'User registered successfully.',
            token,
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({
            error: 'An error occurred while registering user.',
        });
    }
};

// Login User
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        let user: User[] = (
            await DatabaseHelper.exec('getUserByEmail', { email })
        ).recordset;

        if (!user[0]) {
            return res.status(404).json({ message: 'User not found' });
        }

        let validUser = await bcrypt.compare(password, user[0].password);

        if (!validUser) {
            return res
                .status(404)
                .json({ message: 'Wrong username or password' });
        }

        const payload = user.map((u) => {
            const {
                password,
                firstName,
                lastName,
                address,
                isDeleted,
                ...rest
            } = u;
            return rest;
        });

        const token = jwt.sign(payload[0], process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });

        return res.json({ message: 'Log in successfull', token });
    } catch (error: any) {
        return res.status(404).json(error.message);
    }
};

//Get all users
export const getUsers: RequestHandler = async (req, res) => {
    try {
        const users = (await DatabaseHelper.exec('GetAllUsers')).recordset;
        if (users.length > 0) {
            return res.status(200).json(users);
        }
        return res.status(404).json({ message: 'No users registered' });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

//Get User By Email
export const getUserByEmail: RequestHandler = async (req, res) => {
    try {
        const { email } = req.query as { email: string };
        const user = (await DatabaseHelper.exec('GetUserByEmail', { email }))
            .recordset;
        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).json({ message: 'User Not Found' });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

// Get user by ID
export const getUserByID: RequestHandler = async (req, res) => {
    try {
        const { id } = req.query as { id: string };

        const user = (await DatabaseHelper.exec('GetUserByID', { id }))
            .recordset;
        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).json({ message: 'User Not Found' });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

//Update User
export const updateUser = async (req: ExtendedRequest, res: Response) => {
    try {
        const { firstName, lastName, email, password, address } = req.body;
        let hashedPassword = await bcrypt.hash(password, 10);
        const { id } = req.params;
        const user = (await DatabaseHelper.exec('GetUserByID', { id }))
            .recordset[0];
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        await DatabaseHelper.exec('UpdateUser', {
            id,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            address,
        });
        return res.status(200).json({ message: 'Details updated sucessfully' });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

// Delete user
export const deleteUser = async (req: ExtendedRequest, res: Response) => {
    try {
        const { id } = req.params;
        const user = (await DatabaseHelper.exec('GetUserByID', { id }))
            .recordset[0];
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        await DatabaseHelper.exec('DeleteUser', { id });
        res.status(200).json({ message: 'User deleted successfuly' });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};
