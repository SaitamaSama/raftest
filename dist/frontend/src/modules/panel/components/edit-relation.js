"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditRelation = void 0;
const core_1 = require("@material-ui/core");
const lab_1 = require("@material-ui/lab");
const React = require("react");
const panel_1 = require("../../common/components/panel");
const config = require("../../../config.json");
async function save(selectedSource, destinationSource, tag) {
    try {
        const request = await fetch(`${config.API_HOST}/person`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                source: selectedSource,
                destination: destinationSource,
                tag,
            }),
        });
    }
    catch (error) {
        console.error(error);
    }
}
const EditRelation = ({ people, tags, }) => {
    const [selectedPersonSrc, setSelectedPersonSrc] = React.useState();
    const [selectedPersonDest, setSelectedPersonDest] = React.useState();
    const [selectedTag, setSelectedTag] = React.useState();
    return (React.createElement(panel_1.Panel, null,
        React.createElement(core_1.Typography, { variant: "h4", gutterBottom: true }, "Edit relation"),
        React.createElement("form", { onSubmit: ev => {
                ev.preventDefault();
                if (!selectedPersonDest || !selectedPersonSrc || !selectedTag)
                    return;
                save(selectedPersonSrc, selectedPersonDest, selectedTag);
            } },
            React.createElement("section", { className: "flex" },
                React.createElement(lab_1.Autocomplete, { options: people, getOptionLabel: option => option.name, value: selectedPersonSrc, onChange: (_, person) => person && setSelectedPersonSrc(person), style: { width: '35%' }, renderInput: params => (React.createElement(core_1.TextField, Object.assign({}, params, { variant: "filled", label: "Person to be tagged from", placeholder: "Relate them", fullWidth: true, size: "small" }))) }),
                React.createElement("section", { className: "grow flex center" },
                    React.createElement(core_1.Typography, { variant: "body2" }, "and")),
                React.createElement(lab_1.Autocomplete, { options: people, getOptionLabel: option => option.name, value: selectedPersonDest, onChange: (_, person) => person && setSelectedPersonDest(person), style: { width: '35%' }, renderInput: params => (React.createElement(core_1.TextField, Object.assign({}, params, { variant: "filled", label: "Person to be tagged to", placeholder: "Relate them", fullWidth: true, size: "small" }))) })),
            React.createElement("section", { className: "flex gap-top" },
                React.createElement(lab_1.Autocomplete, { options: tags, getOptionLabel: option => option.value, value: selectedTag, style: { width: '35%' }, onChange: (_, tag) => tag && setSelectedTag(tag), renderInput: params => (React.createElement(core_1.TextField, Object.assign({}, params, { variant: "filled", label: "Tag", placeholder: "Relation between the people", fullWidth: true, size: "small" }))) }),
                React.createElement("div", { className: "grow" }),
                React.createElement("section", { className: "flex a-bottom" },
                    React.createElement(core_1.Button, { variant: "contained", color: "primary", type: "submit" }, "Save"))))));
};
exports.EditRelation = EditRelation;
//# sourceMappingURL=edit-relation.js.map