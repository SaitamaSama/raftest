import { Paper } from '@material-ui/core';
import * as React from 'react';
import '../scss/panel.scss';

export const Panel: React.FC<Record<string, unknown>> = ({
  children,
}): JSX.Element => {
  return (
    <Paper className="panel" elevation={8}>
      {children}
    </Paper>
  );
};
