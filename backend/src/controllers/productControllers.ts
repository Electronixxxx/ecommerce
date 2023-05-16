import { Response, Request, RequestHandler } from 'express';
import mssql from 'mssql';
import { v4 as uid } from 'uuid';
import { sqlConfig } from '../config';
import { DatabaseHelper } from '../DatabaseHelper';

interface Product {
    productID: string;
    productName: string;
    description: string;
    longDescription: string;
    price: number;
    category: string;
    stock: number;
    images: string;
}

interface ExtendedRequest extends Request {
    body: Product;
    params: {
        productID: string;
    };
}

// Create product
export const createProduct = async (req: Request, res: Response) => {
    try {
        const {
            productName,
            description,
            longDescription,
            price,
            category,
            stock,
            images,
        } = req.body;

        const productID = uid();
        await DatabaseHelper.exec('CreateProduct', {
            productID,
            productName,
            description,
            longDescription,
            price,
            category,
            stock,
            images,
        });
        return res
            .status(200)
            .json({ message: 'Product created successfully' });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

// Get all products
export const getAllProducts: RequestHandler = async (req, res) => {
    try {
        const result = (await DatabaseHelper.exec('GetAllProducts')).recordset;
        if (result.length > 0) {
            return res.status(200).json(result);
        }
        return res.status(404).json({ message: 'No products found!!' });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

// Get a product by ID
export const getProductByID: RequestHandler = async (req, res) => {
    try {
        const { id } = req.query;
        const product: Product = await (
            await DatabaseHelper.exec('GetProductByID', { id })
        ).recordset[0];
        if (product) {
            return res.status(200).json(product);
        }
        return res.status(404).json({ message: 'Product not found!' });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

// Get a product by name
export const getProductByName: RequestHandler = async (req, res) => {
    try {
        const { productName } = req.query;
        const product = await (
            await DatabaseHelper.exec('GetProductByName', { productName })
        ).recordset[0];
        if (product) {
            res.status(200).json(product);
        }
        return res.status(404).json({ message: 'No products with that name!' });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

// Get products by price range
export const getProductsByPriceRange = async (req: Request, res: Response) => {
    try {
        const { minPrice, maxPrice } = req.body;
        const result = (
            await DatabaseHelper.exec('GetProductsByPriceRange', {
                minPrice,
                maxPrice,
            })
        ).recordset;
        if (result.length > 0) {
            return res.status(200).json(result);
        }
        return res.status(404).json({ message: 'No products in that range' });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

// Get products by quantity range
export const getProductsByQuantityRange = async (
    req: Request,
    res: Response
) => {
    try {
        const { minQuantity, maxQuantity } = req.body;
        const result = (
            await DatabaseHelper.exec('GetProductsByQuantityRange', {
                minQuantity,
                maxQuantity,
            })
        ).recordset;
        if (result.length > 0) {
            return res.status(200).json(result);
        }
        return res.status(404).json({ message: 'No products in that range' });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

// Getall available products
export const getAvailableProducts = async (
    req: ExtendedRequest,
    res: Response
) => {
    try {
        const result = (await DatabaseHelper.exec('GetAvailableProducts'))
            .recordset;
        if (result.length > 0) {
            return res.status(200).json(result);
        }
        return res.status(404).json({ message: 'Wow such empty!!' });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

// Update a product
export const updateProduct = async (req: ExtendedRequest, res: Response) => {
    try {
        const {
            productID,
            productName,
            description,
            longDescription,
            category,
            price,
            stock,
            images,
        } = req.body;

        const product = await (
            await DatabaseHelper.exec('GetProductByID', { productID })
        ).recordset[0];

        if (!product) {
            return res.json({ message: 'Product not found' });
        }
        await DatabaseHelper.exec('UpdateProduct', {
            productID,
            productName,
            description,
            longDescription,
            category,
            price,
            stock,
            images,
        });
        return res
            .status(200)
            .json({ message: 'Product updated successfully.' });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

// Delete a product
export const deleteProduct = async (req: ExtendedRequest, res: Response) => {
    try {
        const { productID } = req.params;

        const product = await (
            await DatabaseHelper.exec('GetProductByID', { productID })
        ).recordset[0];

        if (!product) {
            return res.json({ message: 'Product not found' });
        }

        await DatabaseHelper.exec('DeleteProduct', { productID });
        return res
            .status(200)
            .json({ message: 'Product deleted successfully' });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};
