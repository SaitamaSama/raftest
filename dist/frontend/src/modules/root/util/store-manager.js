"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editTag = exports.addTag = exports.addPerson = void 0;
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
function editTag(setTags) {
    return (tags, tag) => {
        const index = tags.findIndex(t => t.id === t.id);
        tags[index] = tag;
        setTags(tags);
    };
}
exports.editTag = editTag;
//# sourceMappingURL=store-manager.js.map