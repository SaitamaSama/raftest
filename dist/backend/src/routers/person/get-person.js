"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPerson = void 0;
const person_1 = require("../../entities/person");
async function getPerson(request, response) {
    const personRepo = request.db.getRepository(person_1.Person);
    const people = await personRepo.find();
    response.status(200).json(people);
}
exports.getPerson = getPerson;
//# sourceMappingURL=get-person.js.map