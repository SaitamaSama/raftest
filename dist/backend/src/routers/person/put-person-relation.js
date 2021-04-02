"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putPersonRelation = void 0;
const person_1 = require("../../entities/person");
async function putPersonRelation(request, response) {
    const { source, destination, tag } = request.body;
    const personRepo = request.db.getRepository(person_1.Person);
    // TODO
    // We need to check if some relation already exists between them
    // If so, need to update the tag, not the entire thing
    const sourceFromDB = await personRepo.findOne({
        id: source.id,
    });
    if (!sourceFromDB) {
        response.status(404).json({
            message: 'Person not found.',
        });
        return;
    }
    const updatedSourcePerson = new person_1.Person(source.name).composeWithID(source.id, source.name, [...source.tags, tag.id], [...source.related, destination.id]);
    await personRepo.save(updatedSourcePerson);
    const updatedDestinationPerson = new person_1.Person(destination.name).composeWithID(destination.id, destination.name, [...destination.tags, tag.id], [...destination.related, source.id]);
    await personRepo.save(updatedDestinationPerson);
    response.status(204).json({ success: true });
}
exports.putPersonRelation = putPersonRelation;
//# sourceMappingURL=put-person-relation.js.map