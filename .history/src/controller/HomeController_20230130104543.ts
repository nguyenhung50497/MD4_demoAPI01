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
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    showHomeLogined = async (req: Request, res: Response) => {
        console.log(req.session.User);
        if (req.session.User) {
            let products = await productService.getAll();
            res.render('homeLogined', { products: products });
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    showHomeCustomer = async (req: Request, res: Response) => {
        if (req.session.User) {
            let products = await productService.getAll();
            res.render('homeCustomer', { products: products });
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    // showFormCreate = async (req: Request, res: Response) => {
    //     if (req.session.User) {
    //         console.log(2);
    //         let categories = await categoryService.getAll();
    //         res.render('products/create', {categories: categories});
    //     }
    //     else {
    //         res.redirect(301, '/users/login');
    //     }
    // }

    createProduct = async (req: Request, res: Response) => {
        try {
            let newProduct = await productService.save(req.body);
            res.status(200).json(newProduct);
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
    
    // showFormEdit = async (req: Request, res: Response) => {
    //     if (req.session.User) {
    //         let id = req.params.id;
    //         let product = await productService.findById(id);
    //         let categories = await categoryService.getAll();
    //         res.render('products/edit', {product: product, categories: categories});
    //     }
    //     else {
    //         res.redirect(301, '/users/login');
    //     }
    // }

    updateProduct = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            let editProduct = await this.productService.update(id, req.body);
            res.status(200).json(editProduct);
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    // showFormDelete = async (req: Request, res: Response) => {
    //     if (req.session.User) {
    //         let idDelete = req.params.id;
    //         res.render('products/delete', {idDelete: idDelete});
    //     }
    //     else {
    //         res.redirect(301, '/users/login');
    //     }
    // }

    deleteProduct = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            await this.productService.remove(id);
            res.status(200).json('Delete product successfully');
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    showFormDetail = async (req: Request, res: Response) => {
        if (req.session.User) {
            let product = await productService.findById(req.params.id);
            res.render('products/detail', { product: product });
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    searchProduct = async (req: Request, res: Response) => {
        let products = await productService.search(req.body.search);
        res.render('homeCustomer', { products: products });
    }

    search = async (req: Request, res: Response) => {
        try {
        let products = await productService.search(req.body.search);
        res.render('homeCustomer', { products: products });
        } catch (err) {
            res.status(500).json(err.message)
        }
    }
}

export default new HomeController();