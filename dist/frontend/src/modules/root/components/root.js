"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Root = void 0;
const React = require("react");
const add_person_1 = require("../../panel/components/add-person");
const add_tag_1 = require("../../panel/components/add-tag");
const edit_relation_1 = require("../../panel/components/edit-relation");
require("../scss/root.scss");
require("../scss/base.scss");
const store_manager_1 = require("../util/store-manager");
const config = require("../../../config.json");
const lists_1 = require("../../list/components/lists");
const search_1 = require("../../panel/components/search");
const Root = () => {
    const [tags, setTags] = React.useState([]);
    const [people, setPeople] = React.useState([]);
    function fetchData() {
        fetch(`${config.API_HOST}/person`)
            .then(response => response.json())
            .then(people => {
            setPeople(people);
        });
        fetch(`${config.API_HOST}/tag`)
            .then(response => response.json())
            .then(tags => {
            setTags(tags);
        });
    }
    React.useEffect(() => {
        fetchData();
    }, []);
    return (React.createElement("section", { className: "root" },
        React.createElement("section", { style: { marginRight: '1rem' } },
            React.createElement(add_person_1.AddPerson, { store: people, addPerson: store_manager_1.addPerson(setPeople) }),
            React.createElement(add_tag_1.AddTag, { store: tags, addTag: store_manager_1.addTag(setTags) }),
            React.createElement(edit_relation_1.EditRelation, { people: people, tags: tags, refresh: () => fetchData() })),
        React.createElement("section", null,
            React.createElement(lists_1.Lists, { people: people, tags: tags }),
            React.createElement(search_1.Search, { people: people }))));
};
exports.Root = Root;
//# sourceMappingURL=root.js.map