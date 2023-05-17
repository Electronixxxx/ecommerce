import { Request, Response } from 'express';
import { DatabaseHelper } from '../DatabaseHelper';

export const getCart = async (req: Request, res: Response) => {
    try {
        const customerID = req.user.customerID;
        const cartItems = (
            await DatabaseHelper.exec('GetCartItems', { customerID })
        ).recordset;
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error retrieving cart:', error);
        res.status(500).json({ message: 'Error retrieving cart' });
    }
};

export const addToCart = async (req: Request, res: Response) => {
    const CustomerID = req.user.customerID;
    const { ProductID, Quantity, UnitPrice, TotalPrice } = req.body;

    try {
        await DatabaseHelper.exec('AddToCart', {
            CustomerID,
            ProductID,
            Quantity,
            UnitPrice,
            TotalPrice,
        });
        res.status(200).json({ message: 'Item added to cart successfully.' });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({
            error: 'An error occurred while adding the item to cart.',
        });
    }
};

export const removeFromCart = async (req: Request, res: Response) => {
    const { CustomerID, ProductID } = req.body;

    try {
        const authenticatedCustomerID = req.user.customerID;

        if (authenticatedCustomerID !== CustomerID) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        await DatabaseHelper.exec('RemoveFromCart', { CustomerID, ProductID });
        return res
            .status(200)
            .json({ message: 'Product deleted from the cart successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const clearCart = async (req: Request, res: Response) => {
    const { CustomerID } = req.body;

    try {
        const authenticatedCustomerID = req.user.customerID;

        if (authenticatedCustomerID !== CustomerID) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        await DatabaseHelper.exec('ClearCart', { CustomerID });
        return res
            .status(200)
            .json({ message: 'Product deleted from the cart successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
