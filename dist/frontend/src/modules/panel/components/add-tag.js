"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTag = void 0;
const core_1 = require("@material-ui/core");
const React = require("react");
const panel_1 = require("../../common/components/panel");
const config = require("../../../config.json");
const notistack_1 = require("notistack");
async function save(tag, setTag, store, addTag, enqueueSnackbar, closeSnackbar, setDisabled) {
    if (tag.trim().length === 0) {
        enqueueSnackbar('Tag cannot be empty');
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
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                value: tag,
            }),
        });
        const response = await request.json();
        addTag(store, response.tag);
        setTag('');
    }
    catch (error) {
        console.error(error);
    }
    finally {
        setDisabled(false);
        closeSnackbar(saveSnackBar);
    }
}
const AddTag = ({ store, addTag, }) => {
    const [tag, setTag] = React.useState('');
    const [disabled, setDisabled] = React.useState(false);
    const { enqueueSnackbar, closeSnackbar } = notistack_1.useSnackbar();
    return (React.createElement(panel_1.Panel, null,
        React.createElement(core_1.Typography, { variant: "h4", gutterBottom: true }, "Add tag"),
        React.createElement("form", { className: "flex", onSubmit: ev => {
                ev.preventDefault();
                save(tag, setTag, store, addTag, enqueueSnackbar, closeSnackbar, setDisabled);
            } },
            React.createElement(core_1.TextField, { label: "Name", variant: "filled", size: "small", style: { width: '35%' }, value: tag, onChange: ev => setTag(ev.target.value), disabled: disabled, fullWidth: true, className: "grow" }),
            React.createElement("div", { className: "grow" }),
            React.createElement("section", { className: "flex a-bottom" },
                React.createElement(core_1.Button, { variant: "contained", color: "primary", type: "submit", disabled: disabled }, "Save")))));
};
exports.AddTag = AddTag;
//# sourceMappingURL=add-tag.js.map