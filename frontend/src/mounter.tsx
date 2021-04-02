import { MuiThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import * as React from 'react';
import { render } from 'react-dom';
import { Root } from './modules/root/components/root';
import { getTheme } from './theme';

render(
  <MuiThemeProvider theme={getTheme('dark')}>
    <SnackbarProvider maxSnack={3}>
      <Root />
    </SnackbarProvider>
  </MuiThemeProvider>,
  document.querySelector('[data-mount]'),
);
