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
import { authenticateAdmin } from '../middlewares/authenticateAdmin';
import { authenticateUser } from '../middlewares/authenticateUser';

export const ProductRoutes = Router();

ProductRoutes.post('', authenticateAdmin, createProduct);
ProductRoutes.get('', getAllProducts);
ProductRoutes.get('/product', getProductByID);
ProductRoutes.get('/name', getProductByName);
ProductRoutes.get('/range', getProductsByPriceRange);
ProductRoutes.get('/stock', authenticateAdmin, getProductsByQuantityRange);
ProductRoutes.get('/iko', authenticateUser, getAvailableProducts);
ProductRoutes.put('', authenticateAdmin, updateProduct);
ProductRoutes.delete('/:id', authenticateAdmin, deleteProduct);
