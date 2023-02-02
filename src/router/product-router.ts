import { Router } from 'express';
import homeController from "../controller/HomeController";
import { auth } from '../middleware/auth';
import { role } from '../middleware/role';

export const productRouter = Router();
productRouter.use(auth);
productRouter.get('', homeController.getAll);
productRouter.post('', role, homeController.createProduct);
productRouter.put('/:id', role, homeController.updateProduct);
productRouter.delete('/:id', role, homeController.deleteProduct);
productRouter.get('/find-by-name', homeController.search);
