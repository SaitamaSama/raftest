import { Paper, PaperProps } from '@material-ui/core';
import * as React from 'react';
import '../scss/panel.scss';

export const Panel: React.FC<PaperProps> = ({
  children,
  ...props
}): JSX.Element => {
  return (
    <Paper elevation={8} {...props} className={`panel ${props.className}`}>
      {children}
    </Paper>
  );
};
