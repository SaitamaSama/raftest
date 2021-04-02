"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graph = void 0;
const person_1 = require("../../entities/person");
async function graph(request, response) {
    const { from, to } = request.body;
    const personRepo = request.db.getRepository(person_1.Person);
    const people = await personRepo.find();
    console.log(JSON.stringify({ from, to }));
    console.log(JSON.stringify(people));
    response.json({});
}
exports.graph = graph;
//# sourceMappingURL=graph.js.map