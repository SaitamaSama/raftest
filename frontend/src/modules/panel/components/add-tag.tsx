import {
  Button,
  TablePaginationBaseProps,
  TextField,
  Typography,
} from '@material-ui/core';
import * as React from 'react';
import { Tag } from '../../../../../backend/src/entities/tag';
import { Panel } from '../../common/components/panel';
import { DispatchedAction } from '../../root/util/store-manager';
import * as config from '../../../config.json';

export interface AddTagProps {
  store: Array<Tag>;
  addTag: DispatchedAction<Array<Tag>, Tag>;
}

async function save(
  tag: string,
  setTag: React.Dispatch<React.SetStateAction<string>>,
  store: Array<Tag>,
  addTag: DispatchedAction<Array<Tag>, Tag>,
): Promise<void> {
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
  } catch (error) {
    console.error(error);
  }
}

export const AddTag: React.FC<AddTagProps> = ({
  store,
  addTag,
}): JSX.Element => {
  const [tag, setTag] = React.useState<string>('');

  return (
    <Panel>
      <Typography variant="h4" gutterBottom>
        Add tag
      </Typography>
      <form
        className="flex"
        onSubmit={ev => {
          ev.preventDefault();
          save(tag, setTag, store, addTag);
        }}
      >
        <TextField
          label="Name"
          variant="filled"
          size="small"
          style={{ width: '35%' }}
          value={tag}
          onChange={ev => setTag(ev.target.value)}
        />
        <div className="grow" />
        <section className="flex a-bottom">
          <Button variant="outlined" color="primary" type="submit">
            Save
          </Button>
        </section>
      </form>
    </Panel>
  );
};
