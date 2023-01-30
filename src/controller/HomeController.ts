import { Request, Response } from "express";
import productService from '../service/ProductService';
import categoryService from '../service/CategoryService';

class HomeController {
    private productService;
    private categoryService;
    constructor() {
        this.productService = productService;
        this.categoryService = categoryService;
    }

    getAll = async (req: Request, res: Response) => {
        try {
            let products = await productService.getAll();
            let categories = await categoryService.getAll();
            let data = [ products, categories];
            console.log(data);
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    createProduct = async (req: Request, res: Response) => {
        try {
            let newProduct = await productService.save(req.body);
            res.status(200).json(newProduct);
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    updateProduct = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            let editProduct = await this.productService.update(id, req.body);
            res.status(200).json({
                Message: 'Update product success',
                editProduct
            });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    deleteProduct = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            await this.productService.remove(id);
            res.status(200).json('Delete product successfully');
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
    
    search = async (req: Request, res: Response) => {
        try {
            let products = await productService.search(req.params.name);
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
}

export default new HomeController();