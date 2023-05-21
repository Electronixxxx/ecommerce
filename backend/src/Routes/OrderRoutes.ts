import { Router } from 'express';
import { authenticateUser } from '../middlewares/authenticateUser';
import { getAllOrders, getOrderByID, placeOrder, updateOrder } from '../controllers/orderControllers';
import { authenticateAdmin } from '../middlewares/authenticateAdmin';

export const OrderRoutes = Router();

OrderRoutes.get('', authenticateAdmin, getAllOrders);
OrderRoutes.get('/:id', authenticateAdmin, getOrderByID);
OrderRoutes.put('/:id', authenticateAdmin, updateOrder);
OrderRoutes.post('', authenticateUser, placeOrder);
