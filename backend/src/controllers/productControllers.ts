import { Response, Request, RequestHandler } from 'express';
import mssql from 'mssql';
import { v4 as uid } from 'uuid';
import { sqlConfig } from '../config';

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

interface ExtendedRequest {
    body: Product;
    params: {
        productID: string;
    };
}

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
        const pool = await mssql.connect(sqlConfig);
        await pool
            .request()
            .input('productID', mssql.VarChar, productID)
            .input('productName', mssql.VarChar, productName)
            .input('description', mssql.VarChar, description)
            .input('longDescription', mssql.VarChar, longDescription)
            .input('price', mssql.Decimal, price)
            .input('category', mssql.VarChar, category)
            .input('stock', mssql.Int, stock)
            .input('images', mssql.VarChar, images)
            .execute('CreateProduct');

        return res
            .status(200)
            .json({ message: 'Product created successfully' });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

export const getAllProducts: RequestHandler = async (req, res) => {
    try {
        const pool = await mssql.connect(sqlConfig);
        const result = (await pool.request().execute('GetAllProducts'))
            .recordset;
        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

export const getProductByID: RequestHandler = async (req, res) => {
    try {
        const { id } = req.query;
        const pool = await mssql.connect(sqlConfig);
        const product = await (
            await pool
                .request()
                .input('productID', id)
                .execute('GetProductByID')
        ).recordset[0];
        res.status(200).json(product);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

export const getProductByName: RequestHandler = async (req, res) => {
    try {
        const { productName } = req.query;
        const pool = await mssql.connect(sqlConfig);
        const product = await (
            await pool
                .request()
                .input('productName', productName)
                .execute('GetProductByName')
        ).recordset[0];
        res.status(200).json(product);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

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

        const pool = await mssql.connect(sqlConfig);
        const product = await (
            await pool
                .request()
                .input('productID', productID)
                .execute('GetProductByID')
        ).recordset[0];
        if (!product) {
            return res.json({ message: 'Product not found' });
        }
        await pool
            .request()
            .input('productID', mssql.VarChar, productID)
            .input('productName', mssql.VarChar, productName)
            .input('description', mssql.VarChar, description)
            .input('longDescription', mssql.VarChar, longDescription)
            .input('category', mssql.VarChar, category)
            .input('price', mssql.Decimal(18, 2), price)
            .input('stock', mssql.Int, stock)
            .input('images', mssql.VarChar, images)
            .execute('UpdateProduct');

        return res
            .status(200)
            .json({ message: 'Product updated successfully.' });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

export const getProductsByPriceRange = async (req: Request, res: Response) => {
    try {
        const { min, max } = req.body;
        const pool = await mssql.connect(sqlConfig);
        const result = await pool
            .request()
            .input('minPrice', mssql.Decimal(18, 2), min)
            .input('maxPrice', mssql.Decimal(18, 2), max)
            .execute('GetProductsByPriceRange');
        res.status(200).json(result.recordset);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

export const getProductsByQuantityRange = async (
    req: Request,
    res: Response
) => {
    try {
        const { min, max } = req.body;
        const pool = await mssql.connect(sqlConfig);
        const result = await (
            await pool
                .request()
                .input('minQuantity', mssql.Int, min)
                .input('maxQuantity', mssql.Int, max)
                .execute('GetProductsByQuantityRange')
        ).recordset;
        res.status(200).json(result);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

export const getAvailableProducts = async (
    req: ExtendedRequest,
    res: Response
) => {
    try {
        const pool = await mssql.connect(sqlConfig);
        const result = await (
            await pool.request().execute('GetAvailableProducts')
        ).recordset;
        res.status(200).json(result);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

export const deleteProduct = async (req: ExtendedRequest, res: Response) => {
    try {
        const { productID } = req.params;
        const pool = await mssql.connect(sqlConfig);
        const product = await (
            await pool
                .request()
                .input('productID', productID)
                .execute('GetProductByID')
        ).recordset[0];
        if (!product) {
            return res.json({ message: 'Product not found' });
        }
        // const result = await pool
        //     .request()
        //     .input('productID', mssql.VarChar, productID)
        //     .execute('DeleteProduct');

        // if (result.rowsAffected[0] === 0) {
        //     return res.status(404).json({ message: 'Product not found' });
        // }
        return res
            .status(200)
            .json({ message: 'Product deleted successfully' });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};
