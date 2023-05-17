import { Request, RequestHandler, Response } from 'express';
import { v4 as uid } from 'uuid';
import bcrypt from 'bcrypt';
import { DatabaseHelper } from '../DatabaseHelper';

interface ExtendedRequest extends Request {
    body: User;
    params: {
        id: string;
    };
}

interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    address: string;
    city: string;
}

//Add new User
export const addUser = async (req: ExtendedRequest, res: Response) => {
    try {
        let id = uid();
        const {
            username,
            password,
            email,
            first_name,
            last_name,
            address,
            city,
        } = req.body;
        let hashedPassword = await bcrypt.hash(password, 10);
        await DatabaseHelper.exec('RegisterUser', {
            id,
            username,
            email,
            password: hashedPassword,
            first_name,
            last_name,
            address,
            city,
        });
        return res.status(200).json({ mesage: 'User added successfully' });
    } catch (error: any) {
        return res.status(500).json(error.message);
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
        const { email } = req.query;
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
        const { UserID } = req.query;

        const user = (await DatabaseHelper.exec('GetUserByID', { UserID }))
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
        const {
            username,
            email,
            password,
            first_name,
            last_name,
            address,
            city,
        } = req.body;
        let hashedPassword = await bcrypt.hash(password, 10);
        const { id } = req.params;
        const user = (await DatabaseHelper.exec('GetUserByID', { userID: id }))
            .recordset[0];
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        await DatabaseHelper.exec('UpdateUser', {
            id,
            username,
            email,
            password: hashedPassword,
            first_name,
            last_name,
            address,
            city,
        });
        return res.status(200).json({ message: 'User updated sucessfully' });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

// Delete user
export const deleteUser: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const user = (await DatabaseHelper.exec('GetUserByID', {userID:id})).recordset[0]
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        await DatabaseHelper.exec('DeleteUser', {UserID: id})
        res.status(200).json({ message: 'User deleted successfuly' });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};
