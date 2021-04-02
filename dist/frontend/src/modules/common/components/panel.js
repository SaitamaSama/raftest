"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Panel = void 0;
const core_1 = require("@material-ui/core");
const React = require("react");
require("../scss/panel.scss");
const Panel = ({ children, }) => {
    return (React.createElement(core_1.Paper, { className: "panel", elevation: 8 }, children));
};
exports.Panel = Panel;
//# sourceMappingURL=panel.js.map