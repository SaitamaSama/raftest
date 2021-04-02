"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchRouter = void 0;
const express_1 = require("express");
const graph_1 = require("./search/graph");
const router = express_1.Router();
exports.SearchRouter = router;
router.post('/', graph_1.graph);
//# sourceMappingURL=search.js.map