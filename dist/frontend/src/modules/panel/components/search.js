"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
const core_1 = require("@material-ui/core");
const lab_1 = require("@material-ui/lab");
const notistack_1 = require("notistack");
const React = require("react");
const panel_1 = require("../../common/components/panel");
const results_1 = require("./results");
const config = require("../../../config.json");
require("../scss/search.scss");
async function search(source, to, enqueueSnackbar, setResults) {
    if (!source || !to) {
        enqueueSnackbar('Both fields are required to search.');
        return;
    }
    if (source.id === to.id) {
        enqueueSnackbar('They are the same person.');
        return;
    }
    try {
        const request = await fetch(`${config.API_HOST}/search`, {
            method: 'POST',
            body: JSON.stringify({
                from: source,
                to,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const response = await request.json();
        if (response.results.length === 0) {
            enqueueSnackbar('No relation found betwen the selected people.', {
                variant: 'error',
            });
        }
        setResults(response.results);
    }
    catch (error) {
        console.error(error);
    }
}
const Search = ({ people }) => {
    const [selectedPersonSrc, setSelectedPersonSrc] = React.useState();
    const [selectedPersonDest, setSelectedPersonDest] = React.useState();
    const [results, setResults] = React.useState([]);
    const { enqueueSnackbar, closeSnackbar } = notistack_1.useSnackbar();
    return (React.createElement(React.Fragment, null,
        React.createElement(panel_1.Panel, { className: "search-panel" },
            React.createElement(core_1.Typography, { variant: "h4", gutterBottom: true }, "Seach for links"),
            React.createElement("form", { className: "flex", onSubmit: ev => {
                    ev.preventDefault();
                    search(selectedPersonSrc, selectedPersonDest, enqueueSnackbar, setResults);
                } },
                React.createElement(lab_1.Autocomplete, { options: people, getOptionLabel: option => option.name, value: selectedPersonSrc, onChange: (_, person) => person && setSelectedPersonSrc(person), style: { width: '35%' }, renderInput: params => (React.createElement(core_1.TextField, Object.assign({}, params, { variant: "filled", label: "Person to be tagged from", placeholder: "Relate them", fullWidth: true, size: "small" }))) }),
                React.createElement("section", { className: "grow flex center" },
                    React.createElement(core_1.Typography, { variant: "body2" }, "and")),
                React.createElement(lab_1.Autocomplete, { options: people, getOptionLabel: option => option.name, value: selectedPersonDest, onChange: (_, person) => person && setSelectedPersonDest(person), style: { width: '35%' }, renderInput: params => (React.createElement(core_1.TextField, Object.assign({}, params, { variant: "filled", label: "Person to be tagged to", placeholder: "Relate them", fullWidth: true, size: "small" }))) }),
                React.createElement("section", { className: "flex a-bottom", style: { marginLeft: '1rem' } },
                    React.createElement(core_1.Button, { variant: "contained", color: "secondary", type: "submit" }, "Search")))),
        results && React.createElement(results_1.Results, { results: results, people: people })));
};
exports.Search = Search;
//# sourceMappingURL=search.js.map