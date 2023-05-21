import { Request, RequestHandler, Response } from 'express';
import { v4 as uid } from 'uuid';
import { DatabaseHelper } from '../DatabaseHelper';

// Place Order
export const placeOrder: RequestHandler = async (req, res) => {
    const { CustomerID, ShippingAddress, PaymentMethod } = req.body;
    const OrderID = uid();
    try {
        const authenticatedCustomerID = req.user.customerID;

        if (authenticatedCustomerID !== CustomerID) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        await DatabaseHelper.exec('PlaceOrder', {
            OrderID,
            CustomerID,
            ShippingAddress,
            PaymentMethod,
        });
        res.status(200).json({
            message: `Order placed successfully, your order ID is: ${OrderID}`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while placing the order',
        });
    }
};

// Get all Orders
export const getAllOrders: RequestHandler = async (req, res) => {
    try {
        const orders = (await DatabaseHelper.exec('GetAllOrders')).recordset;
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while retrieving orders.',
        });
    }
};

// Get Order by ID
export const getOrderByID: RequestHandler = async (req, res) => {
    const OrderID = req.params.orderId;

    try {
        const order = (await DatabaseHelper.exec('GetOrderByID', { OrderID }))
            .recordset;

        if (order.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        return res.status(200).json(order);
    } catch (error) {
        console.error('Error retrieving order:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update Order
export const updateOrder: RequestHandler = async (req, res) => {
    const { OrderID } = req.params;
    const { OrderStatus } = req.body;
    try {
        await DatabaseHelper.exec('UpdateOrderStatus', {
            OrderID,
            OrderStatus,
        });
        return res
            .status(200)
            .json({ message: 'Order status updated successfully.' });
    } catch (error) {
        return res.status(500).json({
            message: 'An error occurred while updating the order status.',
        });
    }
};
