"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPerson = void 0;
const person_1 = require("../../entities/person");
async function createPerson(request, response) {
    const { name } = request.body;
    if (!name) {
        response.status(400).json({ message: "Invalid param 'name'" });
        return;
    }
    if (name.trim().length === 0) {
        response
            .status(400)
            .json({ message: 'Name cannot be blank or just spaces' });
        return;
    }
    try {
        const personRepo = request.db.getRepository(person_1.Person);
        const person = await personRepo.save(new person_1.Person(name));
        response.status(200).json({
            success: true,
            person,
        });
    }
    catch (error) {
        response.status(500).json({ error });
    }
}
exports.createPerson = createPerson;
//# sourceMappingURL=create-person.js.map