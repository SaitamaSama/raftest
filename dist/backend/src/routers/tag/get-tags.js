"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTags = void 0;
const tag_1 = require("../../entities/tag");
async function getTags(request, response) {
    const tagRepo = request.db.getRepository(tag_1.Tag);
    const tags = await tagRepo.find();
    response.status(200).json(tags);
}
exports.getTags = getTags;
//# sourceMappingURL=get-tags.js.map