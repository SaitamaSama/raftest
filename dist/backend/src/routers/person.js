"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonRouter = void 0;
const express_1 = require("express");
const create_person_1 = require("./person/create-person");
const get_person_1 = require("./person/get-person");
const put_person_relation_1 = require("./person/put-person-relation");
const router = express_1.Router();
exports.PersonRouter = router;
router.get('/', get_person_1.getPerson);
router.post('/', create_person_1.createPerson);
router.put('/', put_person_relation_1.putPersonRelation);
//# sourceMappingURL=person.js.map