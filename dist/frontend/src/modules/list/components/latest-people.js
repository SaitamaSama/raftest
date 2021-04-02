"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatestPeople = void 0;
const core_1 = require("@material-ui/core");
const React = require("react");
require("../scss/list.scss");
const LatestPeople = ({ people }) => {
    return (React.createElement(core_1.Paper, { elevation: 4, className: "list" },
        React.createElement(core_1.Typography, { variant: "h5", gutterBottom: true, className: "list-header" }, "Recently added people"),
        React.createElement(core_1.List, null, people
            .slice(-5)
            .reverse()
            .map(person => (React.createElement(core_1.ListItem, { key: person.id },
            React.createElement(core_1.ListItemText, { primary: person.name })))))));
};
exports.LatestPeople = LatestPeople;
//# sourceMappingURL=latest-people.js.map