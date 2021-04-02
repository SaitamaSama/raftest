"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiMiddleWare = void 0;
function apiMiddleWare(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH');
    next();
}
exports.apiMiddleWare = apiMiddleWare;
//# sourceMappingURL=api.js.map