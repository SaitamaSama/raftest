"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Panel = void 0;
const core_1 = require("@material-ui/core");
const React = require("react");
require("../scss/panel.scss");
const Panel = ({ children, ...props }) => {
    return (React.createElement(core_1.Paper, Object.assign({ elevation: 8 }, props, { className: `panel ${props.className}` }), children));
};
exports.Panel = Panel;
//# sourceMappingURL=panel.js.map