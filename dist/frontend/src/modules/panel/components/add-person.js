"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPerson = void 0;
const core_1 = require("@material-ui/core");
const React = require("react");
const panel_1 = require("../../common/components/panel");
const config = require("../../../config.json");
async function save(name, setName, store, addPerson) {
    try {
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
        console.error(error);
    }
}
const AddPerson = ({ store, addPerson, }) => {
    const [name, setName] = React.useState('');
    return (React.createElement(panel_1.Panel, null,
        React.createElement(core_1.Typography, { variant: "h4", gutterBottom: true }, "Add person"),
        React.createElement("form", { className: "flex", onSubmit: ev => {
                ev.preventDefault();
                save(name, setName, store, addPerson);
            } },
            React.createElement(core_1.TextField, { label: "Name", variant: "filled", size: "small", style: { width: '35%' }, value: name, onChange: ev => setName(ev.target.value) }),
            React.createElement("div", { className: "grow" }),
            React.createElement("section", { className: "flex a-bottom" },
                React.createElement(core_1.Button, { variant: "outlined", color: "primary", type: "submit" }, "Save")))));
};
exports.AddPerson = AddPerson;
//# sourceMappingURL=add-person.js.map