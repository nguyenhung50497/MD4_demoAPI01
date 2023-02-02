import { Request, Response } from "express";
import userService from '../service/UserService';
import productService from '../service/ProductService';
import bcrypt from 'bcrypt';

declare module "express-session" {
    interface SessionData {
        User: { [key: string]: any }
    }
}

class HomeController {
    private userService;
    constructor() {
        this.userService = userService;
    }

    register = async (req: Request, res: Response) => {
        let newUser = {
            username: req.body.username,
            password: req.body.password,
            role: 'user',
        }
        let user = await this.userService.registerUser(newUser);
        res.status(201).json(user);
    }

    login = async (req: Request, res: Response) => {
        let response = await this.userService.checkUser(req.body);
        res.status(200).json(response);
    }

    changePassword = async (req: Request, res: Response) => {
    }

    orderProduct = async (req: Request, res: Response) => {
        try {
            let user = await this.userService.findById(req.session.User);
            let product = await productService.findById(req.params.id);
            let cart = await this.userService.orderProduct(+req.body.quantity, req.params.id, req.session.User);
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    payOrder = async (req: Request, res: Response) => {
        if (req.session.User) {
            await userService.changeStatusCart(req.session.User);
            res.redirect(301, '/users/cart');
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    priceRange = async (req: Request, res: Response) => {
        try {
            let products = await productService.priceRange(+req.query.keyword);
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    deleteCart = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            await this.userService.removeCart(id);
            res.status(200).json('Delete cart successfully');
        }
        catch (err) {
            res.status(500).json(err.message);
        }
    }
}

export default new HomeController();