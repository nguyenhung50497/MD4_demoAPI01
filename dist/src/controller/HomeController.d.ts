import { Request, Response } from "express";
declare class HomeController {
    private productService;
    private categoryService;
    constructor();
    getAll: (req: Request, res: Response) => Promise<void>;
    showHomeLogined: (req: Request, res: Response) => Promise<void>;
    showHomeCustomer: (req: Request, res: Response) => Promise<void>;
    createProduct: (req: Request, res: Response) => Promise<void>;
    updateProduct: (req: Request, res: Response) => Promise<void>;
    deleteProduct: (req: Request, res: Response) => Promise<void>;
    showFormDetail: (req: Request, res: Response) => Promise<void>;
    searchProduct: (req: Request, res: Response) => Promise<void>;
    search: (req: Request, res: Response) => Promise<void>;
}
declare const _default: HomeController;
export default _default;
