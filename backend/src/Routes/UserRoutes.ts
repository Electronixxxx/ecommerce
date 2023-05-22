import { Router } from 'express';
import {
    getUsers,
    getUserByEmail,
    getUserByID,
    updateUser,
    deleteUser,
    loginUser,
    changePassword,
    registerUser,
} from '../controllers/userController';
import { authenticateAdmin } from '../middlewares/authenticateAdmin';
import { authenticateUser } from '../middlewares/authenticateUser';

export const UserRoutes = Router();

UserRoutes.post('', registerUser);
UserRoutes.get('/login', loginUser);
UserRoutes.get('', authenticateAdmin, getUsers);
UserRoutes.get('/user', authenticateAdmin, getUserByID);
UserRoutes.get('/mail', authenticateAdmin, getUserByEmail);
UserRoutes.put('/:id', authenticateUser, updateUser);
UserRoutes.post('/:id', changePassword);
UserRoutes.delete('/:id', authenticateAdmin, deleteUser);
