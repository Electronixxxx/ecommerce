import { Request, RequestHandler, Response } from 'express';
import { sqlConfig } from '../config';
import mssql from 'mssql';
import { v4 as uid } from 'uuid';
import bcrypt from 'bcrypt';

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
    firstName: string;
    lastName: string;
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
            firstName,
            lastName,
            address,
            city,
        } = req.body;
        let hashedPassword = await bcrypt.hash(password, 10);
        const pool = await mssql.connect(sqlConfig);
        await pool
            .request()
            .input('id', mssql.VarChar, id)
            .input('username', mssql.VarChar, username)
            .input('email', mssql.VarChar, email)
            .input('password', mssql.VarChar, hashedPassword)
            .input('first_name', mssql.VarChar, firstName)
            .input('last_name', mssql.VarChar, lastName)
            .input('address', mssql.VarChar, address)
            .input('city', mssql.VarChar, city)
            .execute('RegisterUser');
        return res.status(200).json({mesage: "User added successfully"});
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

//Get all users
export const getUsers: RequestHandler = async (req, res) => {
    try {
        const pool = await mssql.connect(sqlConfig);
        let users: User[] = (await pool.request().execute('GetAllUsers'))
            .recordset;
        return res.status(200).json(users);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

//Get User By Email
export const getUserByEmail: RequestHandler = async (req, res) => {
    try {
        const { email } = req.query;
        console.log(email);
        const pool = await mssql.connect(sqlConfig);

        let user: User = (
            await pool.request().input('email', email).execute('GetUserByEmail')
        ).recordset[0];

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
        const { id } = req.query;

        const pool = await mssql.connect(sqlConfig);

        let user: User = (
            await pool.request().input('userID', id).execute('GetUserByID')
        ).recordset[0];

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
            firstName,
            lastName,
            address,
            city,
        } = req.body;
        let hashedPassword = await bcrypt.hash(password, 10);
        const { id } = req.params;
        const pool = await mssql.connect(sqlConfig);
        let user: User = (
            await pool.request().input('UserID', id).execute('GetUserByID')
        ).recordset[0];
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        await pool
            .request()
            .input('userID', id)
            .input('username', username)
            .input('email', email)
            .input('password', hashedPassword)
            .input('first_name', firstName)
            .input('last_name', lastName)
            .input('address', address)
            .input('city', city)
            .execute('UpdateUser');
        return res.status(200).json({ message: 'User updated sucessfully' });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

// Delete user
export const deleteUser: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await mssql.connect(sqlConfig);
        let user: User = (
            await pool.request().input('UserID', id).execute('GetUserByID')
        ).recordset[0];
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        await pool.request().input('UserID', id).execute('DeleteUser');
        res.status(200).json({ message: 'User deleted successfuly' });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};
