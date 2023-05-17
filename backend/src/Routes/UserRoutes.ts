import { Router } from 'express';
import {
    addUser,
    getUsers,
    getUserByEmail,
    getUserByID,
    updateUser,
    deleteUser,
} from '../controllers/userController';
import { authenticateAdmin } from '../middlewares/authenticateAdmin';
import { authenticateUser } from '../middlewares/authenticateUser';

export const UserRoutes = Router();

UserRoutes.post('', addUser);
UserRoutes.get('', authenticateAdmin, getUsers);
UserRoutes.get('/user', authenticateAdmin, getUserByID);
UserRoutes.get('/mail', authenticateAdmin, getUserByEmail);
UserRoutes.put('/:id', authenticateUser, updateUser);
UserRoutes.delete('/:id', authenticateAdmin, deleteUser);
