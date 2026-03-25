import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.post('/login', userController.userLogin);
router.post('/register', userController.userRegister);
router.post('/admin/login', userController.adminLogin);

export default router;