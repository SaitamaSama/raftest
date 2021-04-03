"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editTag = void 0;
const tag_1 = require("../../entities/tag");
async function editTag(request, response) {
    const { tag, newName } = request.body;
    if (!tag || !newName) {
        response.status(400).json({ error: 'Invalid params provided' });
        return;
    }
    if (newName.trim().length === 0) {
        response.status(400).json({ error: 'New name cannot be empty' });
        return;
    }
    try {
        const tagRepo = request.db.getRepository(tag_1.Tag);
        const newTag = await tagRepo.save(new tag_1.Tag(newName).composeWithID(tag.id));
        response.status(200).json({ tag: newTag });
    }
    catch (error) {
        response.status(500).json({ error });
    }
}
exports.editTag = editTag;
//# sourceMappingURL=edit-tag.js.map