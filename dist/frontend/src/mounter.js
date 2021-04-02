"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const React = require("react");
const react_dom_1 = require("react-dom");
const root_1 = require("./modules/root/components/root");
const theme_1 = require("./theme");
react_dom_1.render(React.createElement(core_1.MuiThemeProvider, { theme: theme_1.getTheme('dark') },
    React.createElement(root_1.Root, null)), document.querySelector('[data-mount]'));
//# sourceMappingURL=mounter.js.map