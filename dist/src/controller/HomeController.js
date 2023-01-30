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
                let categories = await CategoryService_1.default.getAll();
                let data = [products, categories];
                console.log(data);
                res.status(200).json(data);
            }
            catch (err) {
                res.status(500).json(err.message);
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
                res.status(200).json({
                    Message: 'Update product success',
                    editProduct
                });
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