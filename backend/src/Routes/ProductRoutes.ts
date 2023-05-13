import { Router } from 'express';
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getAvailableProducts,
    getProductByID,
    getProductByName,
    getProductsByPriceRange,
    getProductsByQuantityRange,
    updateProduct,
} from '../controllers/productControllers';

export const ProductRoutes = Router();

ProductRoutes.post('', createProduct);
ProductRoutes.get('', getAllProducts);
ProductRoutes.get('/product', getProductByID);
ProductRoutes.get('/name', getProductByName);
ProductRoutes.get('/range', getProductsByPriceRange);
ProductRoutes.get('/stock', getProductsByQuantityRange);
ProductRoutes.get('/iko', getAvailableProducts);
ProductRoutes.put('', updateProduct);
ProductRoutes.delete('/:productID', deleteProduct);
