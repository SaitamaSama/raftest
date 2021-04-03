"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagRouter = void 0;
const express_1 = require("express");
const create_tag_1 = require("./tag/create-tag");
const edit_tag_1 = require("./tag/edit-tag");
const get_tags_1 = require("./tag/get-tags");
const router = express_1.Router();
exports.TagRouter = router;
router.get('/', get_tags_1.getTags);
router.post('/', create_tag_1.createTag);
router.put('/', edit_tag_1.editTag);
//# sourceMappingURL=tag.js.map