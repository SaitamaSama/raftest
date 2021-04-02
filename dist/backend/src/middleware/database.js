"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDB = void 0;
function setDB(dbConnection) {
    return (req, res, next) => {
        req.db = dbConnection;
        next();
    };
}
exports.setDB = setDB;
//# sourceMappingURL=database.js.map