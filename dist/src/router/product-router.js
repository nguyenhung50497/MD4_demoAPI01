"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const HomeController_1 = __importDefault(require("../controller/HomeController"));
const auth_1 = require("../middleware/auth");
const role_1 = require("../middleware/role");
exports.productRouter = (0, express_1.Router)();
exports.productRouter.use(auth_1.auth);
exports.productRouter.get('', HomeController_1.default.getAll);
exports.productRouter.post('', role_1.role, HomeController_1.default.createProduct);
exports.productRouter.put('/:id', role_1.role, HomeController_1.default.updateProduct);
exports.productRouter.delete('/:id', role_1.role, HomeController_1.default.deleteProduct);
exports.productRouter.get('/find-by-name', HomeController_1.default.search);
//# sourceMappingURL=product-router.js.map