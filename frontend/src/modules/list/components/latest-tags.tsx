import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';
import * as React from 'react';
import { ListProps } from './lists';
import '../scss/list.scss';

export const LatestTags: React.FC<ListProps> = ({ tags }): JSX.Element => {
  return (
    <Paper elevation={4} className="list">
      <Typography variant="h5" gutterBottom className="list-header">
        Recently added tags
      </Typography>
      <List>
        {tags
          .slice(-5)
          .reverse()
          .map(tag => (
            <ListItem key={tag.id}>
              <ListItemText primary={tag.value} />
            </ListItem>
          ))}
      </List>
    </Paper>
  );
};
