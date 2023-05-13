import { Router } from 'express';
import {
    addUser,
    getUsers,
    getUserByEmail,
    getUserByID,
    updateUser,
    deleteUser
} from '../controllers/userController';

export const UserRoutes = Router();

UserRoutes.post('', addUser)
UserRoutes.get('', getUsers);
UserRoutes.get('/user', getUserByID);
UserRoutes.get('/mail', getUserByEmail);
UserRoutes.put('/:id', updateUser);
UserRoutes.delete('/:id', deleteUser)