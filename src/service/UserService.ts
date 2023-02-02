import { User } from "../model/user";
import { Cart } from "../model/cart";
import { Product } from "../model/product";
import { AppDataSource } from "../data-source";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import SECRET from '../middleware/auth';

class UserService {
    private userRepository;
    private cartRepository;
    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
        this.cartRepository = AppDataSource.getRepository(Cart);
    }

    getAll = async () => {
        let users = await this.userRepository.find();
        return users;
    }

    checkUserName = async (user) => {
        let userCheck = await this.userRepository.findOneBy({ username: user.username});
        if (!userCheck) {
            return null;
        }
        return userCheck;
    }

    checkUser = async (user) => {
        let userCheck = await this.userRepository.findOneBy({ username: user.username});
        if (!userCheck) {
            return 'User not found';
        }
        let comparePassword = await bcrypt.compare(user.password, userCheck.password);
        if (!comparePassword) {
            return 'Password is wrong';
        } else {
            let payload = {
                username: userCheck.username,
                id: userCheck.idUser,
                role: userCheck.role
            }
            const SECRET = '123456';
            const token = jwt.sign(payload, SECRET, {
                expiresIn: 3600000
            });
            const check = {
                token: token,
                username: userCheck.username,
                id: userCheck.idUser,
                role: userCheck.role
            }
            return check;
        }
    }

    registerUser = async (user) => {
        let userCheck = await this.userRepository.findOneBy({ username: user.username});
        if (!userCheck) {
            user.password = await bcrypt.hash(user.password, 10);
            return await this.userRepository.save(user);
        }
        return 'Username already registered';
    }

    findById = async (id) => {
        let user = await this.userRepository.findOneBy({ idUser: id });
        if (!user) {
            return null;
        }
        return user;
    }

    private changePassword = async (id, newPassword) => {
        let user = await this.userRepository.findOneBy({ idUser: id});
        if (!user) {
            return null;
        }
        return this.userRepository.update({idUser: id}, {password: newPassword});
    }

    private orderProduct = async (quantity, product, user) => {
        let cartCheck = await this.cartRepository.findOneBy({ status: 'buying', user: user, product: product});
        if (!cartCheck) {
            let cart = {
                status: 'buying',
                quantity: quantity,
                product: product,
                user: user,
            }
            return await this.cartRepository.save(cart);
        }
        else {
            cartCheck.quantity += quantity;
            return this.cartRepository.update({idCart: cartCheck.id}, {quantity: cartCheck.quantity});
        }
    }

    findCartByUser = async (user) => {
        let sql = `SELECT * FROM cart JOIN product ON cart.product = product.id WHERE user = ${user}`
        let cart = await this.cartRepository.query(sql);
        if (!cart) {
            return null;
        }
        return cart;
    }

    // getAllCart = async () => {
    //     let cart = await this.cartRepository.find().populate('product').populate('user');
    //     return cart;
    // }

    changeStatusCart = async (user) => {
        let cart = await this.cartRepository.find({ user: user });
        if (!cart) {
            return null;
        }
        else {
            for (let i = 0; i < cart.length; i++) {
                await this.cartRepository.update({idCart: cart[i].idCart}, {status: 'paid'})
            }
            return 'success';
        }
    }

    private removeCart = async (idCart) => {
        let product = await this.cartRepository.findOneBy({idCart: idCart});
        if (!product) {
            return null;
        }
        return this.cartRepository.delete({idCart: idCart});
    }

    // totalMoney = async (user) => {
    //     let cart = await Cart.find({ user: user }).populate('product');
    //     let sum = 0;
    //     if (cart) {
    //         for (let i = 0; i < cart.length; i++) {
    //             let product = await Product.findById(cart[i].product);
    //             sum += cart[i].quantity * product.price;
    //         }
    //     }
    // }
}

export default new UserService();