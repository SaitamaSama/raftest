import { Typography } from '@material-ui/core';
import * as React from 'react';
import { Panel } from '../../common/components/panel';

export const Info: React.FC<Record<string, unknown>> = (): JSX.Element => {
  return (
    <Panel>
      <Typography variant="h4" gutterBottom>
        App info
      </Typography>
      <Typography>
        Built using React.JS and Material-UI as an UI framework. Uses a custom
        minimal application wide state store.
      </Typography>
      <Typography>
        Uses a graph to represent the relations between people and use
        k-shortest-path for finding paths for relation lookups.
      </Typography>
    </Panel>
  );
};
