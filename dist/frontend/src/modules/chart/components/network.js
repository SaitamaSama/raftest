"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkChart = void 0;
const core_1 = require("@material-ui/core");
const React = require("react");
const react_d3_graph_1 = require("react-d3-graph");
const NetworkChart = ({ people, }) => {
    const data = {
        nodes: people.map(person => {
            return {
                id: person.name,
                name: person.name,
                labelProperty: 'name',
                renderLabel: true,
                fontColor: '#FFFFFF',
                size: 200,
                fontSize: 14,
            };
        }),
        links: people
            .map(p => {
            return p.related.map(related => {
                var _a;
                return ({
                    source: p.name,
                    target: (_a = people.find(p => p.id === related)) === null || _a === void 0 ? void 0 : _a.name,
                });
            });
        })
            .flat(),
    };
    return (React.createElement(core_1.Paper, null,
        React.createElement(core_1.Typography, { variant: "h4", style: { padding: '1rem' } }, "Graph view"),
        React.createElement("section", { style: { background: '#272B4D', borderRadius: '0 0 5px 5px' } },
            React.createElement(react_d3_graph_1.Graph, { id: "people", data: data, config: {
                    node: {
                        color: '#26DEB0',
                    },
                    link: {
                        color: '#FFFFFF',
                    },
                    width: 900,
                } }))));
};
exports.NetworkChart = NetworkChart;
//# sourceMappingURL=network.js.map