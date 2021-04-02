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

export const LatestPeople: React.FC<ListProps> = ({ people }): JSX.Element => {
  return (
    <Paper elevation={4} className="list">
      <Typography variant="h5" gutterBottom className="list-header">
        Recently added people
      </Typography>
      <List>
        {people
          .slice(-5)
          .reverse()
          .map(person => (
            <ListItem key={person.id}>
              <ListItemText primary={person.name} />
            </ListItem>
          ))}
      </List>
    </Paper>
  );
};
