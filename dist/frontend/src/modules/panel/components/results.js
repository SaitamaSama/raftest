"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Results = exports.RelationStepIcon = void 0;
const core_1 = require("@material-ui/core");
const React = require("react");
const panel_1 = require("../../common/components/panel");
require("../scss/results.scss");
const icons_1 = require("@material-ui/icons");
const RelationStepIcon = (props) => {
    return React.createElement(core_1.StepIcon, Object.assign({}, props, { icon: React.createElement(icons_1.KeyboardArrowRight, null) }));
};
exports.RelationStepIcon = RelationStepIcon;
const Results = ({ results, people, }) => {
    return (React.createElement(panel_1.Panel, { className: "results-panel" },
        React.createElement(core_1.Typography, { variant: "h5" }, "Results"),
        results.length === 0 && (React.createElement("section", { className: "no-results-info" },
            React.createElement(core_1.Typography, { variant: "h6", color: "textSecondary" }, "Results will appear here"))),
        results.map((result, key) => {
            var _a;
            return (React.createElement(core_1.Stepper, { key: key, className: "relation-stepper", activeStep: result.edges.length },
                React.createElement(core_1.Step, null,
                    React.createElement(core_1.StepLabel, { StepIconComponent: exports.RelationStepIcon }, (_a = people.find(person => person.id.toString() === result.edges[0].fromNode)) === null || _a === void 0 ? void 0 : _a.name)),
                result.edges.map((edge, index) => {
                    var _a;
                    return (React.createElement(core_1.Step, { key: key + index },
                        React.createElement(core_1.StepLabel, { StepIconComponent: exports.RelationStepIcon }, (_a = people.find(person => person.id.toString() === edge.toNode)) === null || _a === void 0 ? void 0 : _a.name)));
                })));
        })));
};
exports.Results = Results;
//# sourceMappingURL=results.js.map