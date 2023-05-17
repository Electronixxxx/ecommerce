import { authenticateJWT } from '../middlewares/authenticateUser';
import {
    addToCart,
    getCart,
    removeFromCart,
} from './../controllers/cartControllers';
import { Router } from 'express';

export const CartRoutes = Router();

CartRoutes.post('', authenticateJWT, addToCart);
CartRoutes.get('', authenticateJWT, getCart);
CartRoutes.delete('/clear', authenticateJWT, getCart);
CartRoutes.delete('', authenticateJWT, removeFromCart);
