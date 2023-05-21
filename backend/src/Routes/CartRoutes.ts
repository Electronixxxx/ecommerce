import { authenticateUser } from '../middlewares/authenticateUser';
import {
    addToCart,
    clearCart,
    getCartItems,
    removeFromCart,
} from './../controllers/cartControllers';
import { Router } from 'express';

export const CartRoutes = Router();

CartRoutes.post('', authenticateUser, addToCart);
CartRoutes.get('', authenticateUser, getCartItems);
CartRoutes.delete('', authenticateUser, removeFromCart);
CartRoutes.delete('/clear', authenticateUser, clearCart);
