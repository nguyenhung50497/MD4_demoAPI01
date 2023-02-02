"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.role = void 0;
const role = (req, res, next) => {
    if (req.decoded.role === 'admin') {
        next();
    }
    else {
        res.status(401).json('Invalid');
    }
};
exports.role = role;
//# sourceMappingURL=role.js.map