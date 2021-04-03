"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPerson = void 0;
const core_1 = require("@material-ui/core");
const React = require("react");
const panel_1 = require("../../common/components/panel");
const config = require("../../../config.json");
const notistack_1 = require("notistack");
async function save(name, setName, store, addPerson, enqueueSnackbar, closeSnackbar, setDisabled) {
    if (name.trim().length === 0) {
        enqueueSnackbar('Name cannot be empty.');
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
        const request = await fetch(`${config.API_HOST}/person`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
            }),
        });
        const response = await request.json();
        addPerson(store, response.person);
        setName('');
    }
    catch (error) {
        enqueueSnackbar(`Error: ${JSON.stringify(error)}`, {
            variant: 'error',
        });
    }
    finally {
        setDisabled(false);
        closeSnackbar(saveSnackBar);
    }
}
const AddPerson = ({ store, addPerson, }) => {
    const [name, setName] = React.useState('');
    const [disabled, setDisabled] = React.useState(false);
    const { enqueueSnackbar, closeSnackbar } = notistack_1.useSnackbar();
    return (React.createElement(panel_1.Panel, null,
        React.createElement(core_1.Typography, { variant: "h4", gutterBottom: true }, "Add person"),
        React.createElement("form", { className: "flex", onSubmit: ev => {
                ev.preventDefault();
                save(name, setName, store, addPerson, enqueueSnackbar, closeSnackbar, setDisabled);
            } },
            React.createElement(core_1.TextField, { label: "Name", variant: "filled", size: "small", style: { width: '35%' }, value: name, onChange: ev => setName(ev.target.value), disabled: disabled }),
            React.createElement("div", { className: "grow" }),
            React.createElement("section", { className: "flex a-bottom" },
                React.createElement(core_1.Button, { variant: "contained", color: "primary", type: "submit", disabled: disabled }, "Save")))));
};
exports.AddPerson = AddPerson;
//# sourceMappingURL=add-person.js.map