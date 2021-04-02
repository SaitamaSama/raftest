"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTheme = void 0;
const core_1 = require("@material-ui/core");
function getTheme(mode = 'light') {
    return core_1.createMuiTheme({
        palette: {
            type: mode,
            primary: {
                main: '#F50057',
            },
            secondary: {
                main: '#01A8D5',
            },
            background: {
                default: mode === 'light' ? '#DFDFDF' : '#151515',
                paper: mode === 'light' ? '#f9faff' : '#3D4048',
            },
        },
        typography: {
            fontFamily: 'Poppins, Sen, sans-serif',
            fontWeightBold: 900,
            fontWeightMedium: 500,
            fontWeightRegular: 500,
            fontSize: 15,
            h4: {
                fontWeight: 700,
                fontFamily: "'Poppins', Sen, sans-serif",
            },
            h3: {
                fontWeight: 700,
                fontFamily: "'Poppins', Sen, sans-serif",
            },
            h1: {
                fontWeight: 700,
                fontFamily: "'Poppins', Sen, sans-serif",
            },
            h2: {
                fontWeight: 700,
                fontFamily: "'Poppins', Sen, sans-serif",
                color: '#FFF',
            },
            h6: {
                fontWeight: 700,
                fontFamily: "'Poppins', Sen, sans-serif",
            },
            h5: {
                fontWeight: 700,
                fontFamily: "'Poppins', Sen, sans-serif",
            },
        },
        shape: {
            borderRadius: 5,
        },
        overrides: {
            MuiCssBaseline: {
                '@global': {
                    '@font-face': {},
                },
            },
            MuiButton: {
                label: {
                    fontSize: '.8rem',
                },
            },
        },
    });
}
exports.getTheme = getTheme;
//# sourceMappingURL=theme.js.map