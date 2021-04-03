import { Tooltip, Typography } from '@material-ui/core';
import { Info as InfoIcon } from '@material-ui/icons';
import * as React from 'react';

export interface PanelInfoProps {
  info: string;
}

export const PanelInfo: React.FC<PanelInfoProps> = ({ info }): JSX.Element => {
  return (
    <section className="info-container">
      <Tooltip
        title={
          <>
            <Typography variant="body2">Quick tip!</Typography>
            <Typography variant="body2" color="textSecondary">
              {info}
            </Typography>
          </>
        }
        placement="right"
      >
        <InfoIcon />
      </Tooltip>
    </section>
  );
};
