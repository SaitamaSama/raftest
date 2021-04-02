import { MuiThemeProvider } from '@material-ui/core';
import * as React from 'react';
import { render } from 'react-dom';
import { Root } from './modules/root/components/root';
import { getTheme } from './theme';

render(
  <MuiThemeProvider theme={getTheme('dark')}>
    <Root />
  </MuiThemeProvider>,
  document.querySelector('[data-mount]'),
);
