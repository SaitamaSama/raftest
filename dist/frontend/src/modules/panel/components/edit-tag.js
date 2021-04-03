"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditTag = void 0;
const core_1 = require("@material-ui/core");
const lab_1 = require("@material-ui/lab");
const notistack_1 = require("notistack");
const React = require("react");
const panel_1 = require("../../common/components/panel");
const config = require("../../../config.json");
async function save(tags, selectedTag, newName, setDisabled, enqueueSnackbar, closeSnackbar, editTags, clear) {
    if (!selectedTag) {
        enqueueSnackbar('Select a tag to edit');
        return;
    }
    if (newName.trim().length === 0) {
        enqueueSnackbar('Tag name cannot be empty');
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
        const request = await fetch(`${config.API_HOST}/tag`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tag: selectedTag,
                newName,
            }),
        });
        const response = await request.json();
        editTags(tags, response.tag);
    }
    catch (error) {
        enqueueSnackbar(`Error: ${JSON.stringify(error)}`, {
            variant: 'error',
        });
    }
    finally {
        closeSnackbar(saveSnackBar);
        setDisabled(false);
    }
}
const EditTag = ({ tags, editTags, }) => {
    const [selectedTag, setSelectedTag] = React.useState();
    const [selectedTagText, setSelectedTagText] = React.useState('');
    const [disabled, setDisabled] = React.useState(false);
    const [newTagName, setNewTagName] = React.useState('');
    const { enqueueSnackbar, closeSnackbar } = notistack_1.useSnackbar();
    return (React.createElement(panel_1.Panel, null,
        React.createElement(core_1.Typography, { variant: "h4", gutterBottom: true }, "Edit tag"),
        React.createElement("form", { className: "flex", onSubmit: ev => {
                ev.preventDefault();
                save(tags, selectedTag, newTagName, setDisabled, enqueueSnackbar, closeSnackbar, editTags, () => {
                    setSelectedTag(undefined);
                    setSelectedTagText('');
                    setNewTagName('');
                });
            } },
            React.createElement(lab_1.Autocomplete, { options: tags, getOptionLabel: option => option.value, value: selectedTag, inputValue: selectedTagText, onInputChange: (_, value) => setSelectedTagText(value), style: { width: '35%', flexGrow: 1 }, selectOnFocus: true, onChange: (_, tag) => tag && setSelectedTag(tag), renderInput: params => (React.createElement(core_1.TextField, Object.assign({}, params, { variant: "filled", label: "Tag", placeholder: "Relation between the people", fullWidth: true, size: "small" }))), disabled: disabled }),
            React.createElement("div", { className: "grow" }),
            React.createElement(core_1.TextField, { value: newTagName, onChange: ev => setNewTagName(ev.target.value), variant: "filled", size: "small", label: "New tag name", className: "grow" }),
            React.createElement("div", { className: "grow" }),
            React.createElement("section", { className: "flex a-bottom" },
                React.createElement(core_1.Button, { type: "submit", variant: "contained", color: "secondary" }, "Save")))));
};
exports.EditTag = EditTag;
//# sourceMappingURL=edit-tag.js.map