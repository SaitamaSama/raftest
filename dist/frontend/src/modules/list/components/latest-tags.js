"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatestTags = void 0;
const core_1 = require("@material-ui/core");
const React = require("react");
require("../scss/list.scss");
const LatestTags = ({ tags }) => {
    return (React.createElement(core_1.Paper, { elevation: 4, className: "list" },
        React.createElement(core_1.Typography, { variant: "h5", gutterBottom: true, className: "list-header" }, "Recently added tags"),
        React.createElement(core_1.List, null, tags
            .slice(-5)
            .reverse()
            .map(tag => (React.createElement(core_1.ListItem, { key: tag.id },
            React.createElement(core_1.ListItemText, { primary: tag.value })))))));
};
exports.LatestTags = LatestTags;
//# sourceMappingURL=latest-tags.js.map