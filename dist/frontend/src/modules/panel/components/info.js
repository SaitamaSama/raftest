"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Info = void 0;
const core_1 = require("@material-ui/core");
const React = require("react");
const panel_1 = require("../../common/components/panel");
const Info = () => {
    return (React.createElement(panel_1.Panel, null,
        React.createElement(core_1.Typography, { variant: "h4", gutterBottom: true }, "App info"),
        React.createElement(core_1.Typography, null, "Built using React.JS and Material-UI as an UI framework. Uses a custom minimal application wide state store."),
        React.createElement(core_1.Typography, null, "Uses a graph to represent the relations between people and use k-shortest-path for finding paths for relation lookups.")));
};
exports.Info = Info;
//# sourceMappingURL=info.js.map