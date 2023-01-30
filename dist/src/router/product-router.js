"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const HomeController_1 = __importDefault(require("../controller/HomeController"));
exports.productRouter = (0, express_1.Router)();
exports.productRouter.get('', HomeController_1.default.getAll);
exports.productRouter.post('', HomeController_1.default.createProduct);
exports.productRouter.put('/:id', HomeController_1.default.updateProduct);
exports.productRouter.delete('/:id', HomeController_1.default.deleteProduct);
exports.productRouter.get('/find-by-name?name=:name', HomeController_1.default.search);
//# sourceMappingURL=product-router.js.map