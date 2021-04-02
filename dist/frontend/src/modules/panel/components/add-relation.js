"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTag = void 0;
const core_1 = require("@material-ui/core");
const React = require("react");
const panel_1 = require("../../common/components/panel");
const AddTag = () => {
    return (React.createElement(panel_1.Panel, null,
        React.createElement(core_1.Typography, { variant: "h4", gutterBottom: true }, "Add tag"),
        React.createElement("section", { className: "flex" },
            React.createElement(core_1.TextField, { label: "Name", variant: "filled", size: "small", style: { width: '35%' } }),
            React.createElement("div", { className: "grow" }),
            React.createElement("section", { className: "flex a-bottom" },
                React.createElement(core_1.Button, { variant: "outlined", color: "primary" }, "Save")))));
};
exports.AddTag = AddTag;
//# sourceMappingURL=add-relation.js.map