import express from 'express';
import productController from '../controllers/productController.js';
import upload from '../middlewear/multer.js';
import adminAUT from '../middlewear/adminAUT.js';

const productRouter = express.Router();

// Add a new product (requires admin authentication and file uploads)
productRouter.post(
    '/add',
    adminAUT,
    upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 },
    ]),
    productController.add
);

// Remove a product by ID (requires admin authentication)
productRouter.delete('/remove', adminAUT, productController.remove);

// Get a single product by ID
productRouter.post('/single', productController.single);

// List all products
productRouter.get('/list', productController.list);

export default productRouter;