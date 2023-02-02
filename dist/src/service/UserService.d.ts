declare class UserService {
    private userRepository;
    private cartRepository;
    constructor();
    getAll: () => Promise<any>;
    checkUserName: (user: any) => Promise<any>;
    checkUser: (user: any) => Promise<"User not found" | "Password is wrong" | {
        token: string;
        username: any;
        id: any;
        role: any;
    }>;
    registerUser: (user: any) => Promise<any>;
    findById: (id: any) => Promise<any>;
    private changePassword;
    private orderProduct;
    findCartByUser: (user: any) => Promise<any>;
    changeStatusCart: (user: any) => Promise<string>;
    private removeCart;
}
declare const _default: UserService;
export default _default;
