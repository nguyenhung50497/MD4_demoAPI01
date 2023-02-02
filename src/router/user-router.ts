import { Router } from 'express';
import userController from "../controller/UserController";
import { auth } from '../middleware/auth';

export const userRouter = Router();
userRouter.post('/login', userController.login);
userRouter.post('/register', userController.register);
// userRouter.post('/change-pass', userController.changePassword);
// userRouter.get('/logout', userController.logout);
// userRouter.get('/cart', userController.showFormCart);
// userRouter.get('/search-product', userController.searchProduct);
// userRouter.get('/price-range', userController.priceRange);
// userRouter.post('/order/:id', userController.orderProduct);
// userRouter.get('/pay-orders', userController.payOrder);
// userRouter.post('/delete/:id', userController.deleteCart);