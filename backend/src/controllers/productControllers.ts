import { Response, Request, RequestHandler } from 'express';
import { v4 as uid } from 'uuid';
import { DatabaseHelper } from '../DatabaseHelper';
import { ExtendedProductRequest, Product } from '../Interfaces/index';

// Create product
export const createProduct = async (req: Request, res: Response) => {
    try {
        const {
            productName,
            description,
            longDescription,
            unitPrice,
            discount,
            category,
            stock,
        } = req.body;

        const id = uid();
        await DatabaseHelper.exec('CreateProduct', {
            id,
            productName,
            description,
            longDescription,
            unitPrice,
            discount,
            category,
            stock,
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
        const { id } = req.query as { id: string };
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
        const { productName } = req.query as { productName: string };
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

// Get all available products
export const getAvailableProducts = async (
    req: ExtendedProductRequest,
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
export const updateProduct = async (
    req: ExtendedProductRequest,
    res: Response
) => {
    try {
        const {
            id,
            productName,
            description,
            longDescription,
            unitPrice,
            discount,
            stock,
            category,
        } = req.body;

        const product = await (
            await DatabaseHelper.exec('GetProductByID', { id })
        ).recordset[0];

        if (!product) {
            return res.json({ message: 'Product not found' });
        }
        await DatabaseHelper.exec('UpdateProduct', {
            id,
            productName,
            description,
            longDescription,
            category,
            unitPrice,
            discount,
            stock,
        });
        return res
            .status(200)
            .json({ message: 'Product updated successfully.' });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

// Delete a product
export const deleteProduct = async (
    req: ExtendedProductRequest,
    res: Response
) => {
    try {
        const { id } = req.params;

        const product = await (
            await DatabaseHelper.exec('GetProductByID', { id })
        ).recordset[0];

        if (!product) {
            return res.json({ message: 'Product not found' });
        }

        await DatabaseHelper.exec('DeleteProduct', { id });
        return res
            .status(200)
            .json({ message: 'Product deleted successfully' });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};
