"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../service/UserService"));
const ProductService_1 = __importDefault(require("../service/ProductService"));
class HomeController {
    constructor() {
        this.register = async (req, res) => {
            let newUser = {
                username: req.body.username,
                password: req.body.password,
                role: 'user',
            };
            let user = await this.userService.registerUser(newUser);
            res.status(201).json(user);
        };
        this.login = async (req, res) => {
            let response = await this.userService.checkUser(req.body);
            res.status(200).json(response);
        };
        this.changePassword = async (req, res) => {
        };
        this.orderProduct = async (req, res) => {
            try {
                let user = await this.userService.findById(req.session.User);
                let product = await ProductService_1.default.findById(req.params.id);
                let cart = await this.userService.orderProduct(+req.body.quantity, req.params.id, req.session.User);
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.payOrder = async (req, res) => {
            if (req.session.User) {
                await UserService_1.default.changeStatusCart(req.session.User);
                res.redirect(301, '/users/cart');
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.priceRange = async (req, res) => {
            try {
                let products = await ProductService_1.default.priceRange(+req.query.keyword);
                res.status(200).json(products);
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.deleteCart = async (req, res) => {
            try {
                let id = req.params.id;
                await this.userService.removeCart(id);
                res.status(200).json('Delete cart successfully');
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.userService = UserService_1.default;
    }
}
exports.default = new HomeController();
//# sourceMappingURL=UserController.js.map