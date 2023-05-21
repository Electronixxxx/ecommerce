import { Request, Response } from 'express';
import { DatabaseHelper } from '../DatabaseHelper';
import { v4 as uid } from 'uuid';

// Get Cart Items
export const getCartItems = async (req: Request, res: Response) => {
    try {
        const { id } = req.body.user;

        const result = (
            await DatabaseHelper.exec('GetCartItems', {
                customerID: id,
            })
        ).recordset;
        if (result.length == 0) {
            return res.status(404).json({ message: 'Your cart is empty' });
        }
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error getting cart items:', error);
        res.status(500).json({
            error: 'An error occurred while retrieving cart items.',
        });
    }
};

// Add to Cart
export const addToCart = async (req: Request, res: Response) => {
    try {
        const { id } = req.body.user;
        const itemID = uid();
        const { productID, quantity, unitPrice, discount } = req.body;
        const totalPrice = quantity * unitPrice - discount;

        await DatabaseHelper.exec('AddToCart', {
            itemID,
            customerID: id,
            productID,
            quantity,
            unitPrice,
            discount,
            totalPrice,
        });

        res.status(200).json({ message: 'Item added to cart successfully.' });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({
            error: 'An error occurred while adding item to cart.',
        });
    }
};

// Remove product from Cart
export const removeFromCart = async (req: Request, res: Response) => {
    try {
        const { itemID } = req.body;
        const { id } = req.body.user;

        await DatabaseHelper.exec('RemoveFromCart', {
            itemID,
            CustomerID: id,
        });

        res.status(200).json({
            message: 'Item removed from cart successfully.',
        });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({
            error: 'An error occurred while removing item from cart.',
        });
    }
};

// Clear Cart
export const clearCart = async (req: Request, res: Response) => {
    try {
        const { id } = req.body.user;

        await DatabaseHelper.exec('ClearCart', {
            customerID: id,
        });

        res.status(200).json({ message: 'Cart cleared successfully.' });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({
            error: 'An error occurred while clearing cart.',
        });
    }
};
