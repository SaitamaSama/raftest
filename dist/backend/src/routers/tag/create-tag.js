"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTag = void 0;
const tag_1 = require("../../entities/tag");
async function createTag(request, response) {
    const { value } = request.body;
    if (!value) {
        response.status(400).json({ message: "Invalid param 'value'" });
        return;
    }
    if (value.trim().length === 0) {
        response
            .status(400)
            .json({ message: 'Value cannot be blank or just spaces' });
        return;
    }
    try {
        const tagRepo = request.db.getRepository(tag_1.Tag);
        const tag = await tagRepo.save(new tag_1.Tag(value));
        response.status(200).json({
            success: true,
            tag,
        });
    }
    catch (error) {
        response.status(500).json({ error });
    }
}
exports.createTag = createTag;
//# sourceMappingURL=create-tag.js.map