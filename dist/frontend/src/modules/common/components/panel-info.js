"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelInfo = void 0;
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const React = require("react");
const PanelInfo = ({ info }) => {
    return (React.createElement("section", { className: "info-container" },
        React.createElement(core_1.Tooltip, { title: React.createElement(React.Fragment, null,
                React.createElement(core_1.Typography, { variant: "body2" }, "Quick tip!"),
                React.createElement(core_1.Typography, { variant: "body2", color: "textSecondary" }, info)), placement: "right" },
            React.createElement(icons_1.Info, null))));
};
exports.PanelInfo = PanelInfo;
//# sourceMappingURL=panel-info.js.map