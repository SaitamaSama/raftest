"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const typeorm_1 = require("typeorm");
let Person = class Person {
    constructor(name, tags, related) {
        this.name = name;
        if (tags) {
            this.tags = tags.map(tag => tag.id);
        }
        if (related) {
            this.related = related.map(person => person.id);
        }
        return this;
    }
    composeWithID(id, name, tags, related) {
        this.id = id;
        this.name = name;
        if (tags) {
            this.tags = tags;
        }
        if (related) {
            this.related = related;
        }
        return this;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'id' }),
    __metadata("design:type", Number)
], Person.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'name', nullable: false }),
    __metadata("design:type", String)
], Person.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('int', { nullable: true, array: true, default: [] }),
    __metadata("design:type", Array)
], Person.prototype, "tags", void 0);
__decorate([
    typeorm_1.Column('int', { nullable: true, array: true, default: [] }),
    __metadata("design:type", Array)
], Person.prototype, "related", void 0);
Person = __decorate([
    typeorm_1.Entity('Person'),
    __metadata("design:paramtypes", [String, Array, Array])
], Person);
exports.Person = Person;
//# sourceMappingURL=person.js.map