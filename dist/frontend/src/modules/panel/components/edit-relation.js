"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditRelation = void 0;
const core_1 = require("@material-ui/core");
const lab_1 = require("@material-ui/lab");
const React = require("react");
const panel_1 = require("../../common/components/panel");
const config = require("../../../config.json");
const notistack_1 = require("notistack");
async function save(enqueueSnackbar, selectedSource, selectedDestination, tag, clear, closeSnackbar, setDisabled) {
    if (!selectedSource || !selectedDestination || !tag) {
        enqueueSnackbar('All of the fields are required.');
        return;
    }
    if (selectedSource.id === selectedDestination.id) {
        enqueueSnackbar('Source and destination cannot be the same.');
        return;
    }
    const saveSnackBar = enqueueSnackbar('Saving...', {
        persist: true,
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
        },
    });
    try {
        setDisabled(true);
        await fetch(`${config.API_HOST}/person`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                source: selectedSource,
                destination: selectedDestination,
                tag,
            }),
        });
        clear();
        enqueueSnackbar(`Successfully related ${selectedSource.name} and ${selectedDestination.name}`);
    }
    catch (error) {
        console.error(error);
        enqueueSnackbar(`Error: ${JSON.stringify(error)}`, {
            variant: 'error',
        });
    }
    finally {
        closeSnackbar(saveSnackBar);
        setDisabled(false);
    }
}
const EditRelation = ({ people, tags, refresh, }) => {
    const [selectedPersonSrc, setSelectedPersonSrc] = React.useState();
    const [selectedPersonDest, setSelectedPersonDest] = React.useState();
    const [selectedTag, setSelectedTag] = React.useState();
    const [sourceTextInput, setSourceTextInput] = React.useState('');
    const [destTextInput, setDestTextInput] = React.useState('');
    const [tagTextInput, setTagTextInput] = React.useState('');
    const [disabled, setDisabled] = React.useState(false);
    const { enqueueSnackbar, closeSnackbar } = notistack_1.useSnackbar();
    return (React.createElement(panel_1.Panel, null,
        React.createElement(core_1.Typography, { variant: "h4", gutterBottom: true }, "Edit relation"),
        React.createElement("form", { onSubmit: ev => {
                ev.preventDefault();
                save(enqueueSnackbar, selectedPersonSrc, selectedPersonDest, selectedTag, () => {
                    setSelectedPersonSrc(undefined);
                    setSelectedPersonDest(undefined);
                    setSelectedTag(undefined);
                    setSourceTextInput('');
                    setDestTextInput('');
                    setTagTextInput('');
                    refresh();
                }, closeSnackbar, setDisabled);
            } },
            React.createElement("section", { className: "flex" },
                React.createElement(lab_1.Autocomplete, { options: people, getOptionLabel: option => option.name, value: selectedPersonSrc, inputValue: sourceTextInput, onInputChange: (_, value) => setSourceTextInput(value), onChange: (_, person) => person && setSelectedPersonSrc(person), style: { width: '35%' }, selectOnFocus: true, renderInput: params => (React.createElement(core_1.TextField, Object.assign({}, params, { variant: "filled", label: "Person to be tagged from", placeholder: "Relate them", fullWidth: true, size: "small" }))), disabled: disabled }),
                React.createElement("section", { className: "grow flex center" },
                    React.createElement(core_1.Typography, { variant: "body2" }, "and")),
                React.createElement(lab_1.Autocomplete, { options: people, getOptionLabel: option => option.name, value: selectedPersonDest, inputValue: destTextInput, onInputChange: (_, value) => setDestTextInput(value), onChange: (_, person) => person && setSelectedPersonDest(person), style: { width: '35%' }, selectOnFocus: true, renderInput: params => (React.createElement(core_1.TextField, Object.assign({}, params, { variant: "filled", label: "Person to be tagged to", placeholder: "Relate them", fullWidth: true, size: "small" }))), disabled: disabled })),
            React.createElement("section", { className: "flex gap-top" },
                React.createElement(lab_1.Autocomplete, { options: tags, getOptionLabel: option => option.value, value: selectedTag, inputValue: tagTextInput, onInputChange: (_, value) => setTagTextInput(value), style: { width: '35%' }, selectOnFocus: true, onChange: (_, tag) => tag && setSelectedTag(tag), renderInput: params => (React.createElement(core_1.TextField, Object.assign({}, params, { variant: "filled", label: "Tag", placeholder: "Relation between the people", fullWidth: true, size: "small" }))), disabled: disabled }),
                React.createElement("div", { className: "grow" }),
                React.createElement("section", { className: "flex a-bottom" },
                    React.createElement(core_1.Button, { variant: "contained", color: "primary", type: "submit", disabled: disabled }, "Save"))))));
};
exports.EditRelation = EditRelation;
//# sourceMappingURL=edit-relation.js.map