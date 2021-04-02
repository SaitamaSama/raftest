"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graph = void 0;
const person_1 = require("../../entities/person");
const graphlib_1 = require("graphlib");
//@ts-ignore
const k_shortest_path_1 = require("k-shortest-path");
async function graph(request, response) {
    const { from, to } = request.body;
    const personRepo = request.db.getRepository(person_1.Person);
    const people = await personRepo.find();
    const graph = new graphlib_1.Graph({ directed: true });
    // Adding edges to the graph
    people.forEach(person => {
        person.related.forEach((related, index) => {
            graph.setEdge(person.id.toString(), related.toString(), person.tags[index]);
        });
    });
    // Searching for (k=50 default) k shortest paths between `from` and `to`
    let k = 50;
    if (process.env.PATH_FINDING_K &&
        parseInt(process.env.PATH_FINDING_K) !== NaN) {
        k = parseInt(process.env.PATH_FINDING_K);
    }
    try {
        const results = k_shortest_path_1.ksp(graph, from.id.toString(), to.id.toString(), k);
        response.json({
            results,
        });
    }
    catch (error) {
        response.json({
            results: [],
        });
    }
}
exports.graph = graph;
//# sourceMappingURL=graph.js.map