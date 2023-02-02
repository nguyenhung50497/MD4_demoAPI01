import { Router } from "express";
import { productRouter } from './product-router';
import { userRouter } from "./user-router";

export const router = Router();
router.use('/products', productRouter);
router.use('/auth', userRouter);