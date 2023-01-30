"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductService_1 = __importDefault(require("../service/ProductService"));
const CategoryService_1 = __importDefault(require("../service/CategoryService"));
class HomeController {
    constructor() {
        this.getAll = async (req, res) => {
            try {
                let products = await ProductService_1.default.getAll();
                res.status(200).json(products);
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.showHomeLogined = async (req, res) => {
            console.log(req.session.User);
            if (req.session.User) {
                let products = await ProductService_1.default.getAll();
                res.render('homeLogined', { products: products });
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.showHomeCustomer = async (req, res) => {
            if (req.session.User) {
                let products = await ProductService_1.default.getAll();
                res.render('homeCustomer', { products: products });
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.createProduct = async (req, res) => {
            try {
                let newProduct = await ProductService_1.default.save(req.body);
                res.status(200).json(newProduct);
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.updateProduct = async (req, res) => {
            try {
                let id = req.params.id;
                let editProduct = await this.productService.update(id, req.body);
                res.status(200).json(editProduct);
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.deleteProduct = async (req, res) => {
            try {
                let id = req.params.id;
                await this.productService.remove(id);
                res.status(200).json('Delete product successfully');
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.showFormDetail = async (req, res) => {
            if (req.session.User) {
                let product = await ProductService_1.default.findById(req.params.id);
                res.render('products/detail', { product: product });
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.searchProduct = async (req, res) => {
            let products = await ProductService_1.default.search(req.body.search);
            res.render('homeCustomer', { products: products });
        };
        this.search = async (req, res) => {
            try {
                let products = await ProductService_1.default.search(req.params.name);
                res.status(200).json(products);
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.productService = ProductService_1.default;
        this.categoryService = CategoryService_1.default;
    }
}
exports.default = new HomeController();
//# sourceMappingURL=HomeController.js.map