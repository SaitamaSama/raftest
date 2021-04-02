"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTag = exports.addPerson = void 0;
function addPerson(setStore) {
    return (store, person) => {
        setStore([...store, person]);
    };
}
exports.addPerson = addPerson;
function addTag(setStore) {
    return (store, tag) => {
        setStore([...store, tag]);
    };
}
exports.addTag = addTag;
//# sourceMappingURL=store-manager.js.map