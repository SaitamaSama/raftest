"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lists = void 0;
const React = require("react");
const latest_people_1 = require("./latest-people");
const latest_tags_1 = require("./latest-tags");
require("../scss/lists.scss");
const Lists = (props) => {
    return (React.createElement("section", { className: "lists-container" },
        React.createElement(latest_people_1.LatestPeople, Object.assign({}, props)),
        React.createElement(latest_tags_1.LatestTags, Object.assign({}, props))));
};
exports.Lists = Lists;
//# sourceMappingURL=lists.js.map