"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTag = void 0;
const core_1 = require("@material-ui/core");
const React = require("react");
const panel_1 = require("../../common/components/panel");
const config = require("../../../config.json");
async function save(tag, setTag, store, addTag) {
    try {
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
}
const AddTag = ({ store, addTag, }) => {
    const [tag, setTag] = React.useState('');
    return (React.createElement(panel_1.Panel, null,
        React.createElement(core_1.Typography, { variant: "h4", gutterBottom: true }, "Add tag"),
        React.createElement("form", { className: "flex", onSubmit: ev => {
                ev.preventDefault();
                save(tag, setTag, store, addTag);
            } },
            React.createElement(core_1.TextField, { label: "Name", variant: "filled", size: "small", style: { width: '35%' }, value: tag, onChange: ev => setTag(ev.target.value) }),
            React.createElement("div", { className: "grow" }),
            React.createElement("section", { className: "flex a-bottom" },
                React.createElement(core_1.Button, { variant: "outlined", color: "primary", type: "submit" }, "Save")))));
};
exports.AddTag = AddTag;
//# sourceMappingURL=add-tag.js.map