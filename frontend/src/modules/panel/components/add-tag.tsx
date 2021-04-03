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
import { useSnackbar } from 'notistack';

export interface AddTagProps {
  store: Array<Tag>;
  addTag: DispatchedAction<Array<Tag>, Tag>;
}

async function save(
  tag: string,
  setTag: React.Dispatch<React.SetStateAction<string>>,
  store: Array<Tag>,
  addTag: DispatchedAction<Array<Tag>, Tag>,
  enqueueSnackbar: Function,
  closeSnackbar: Function,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> {
  if (tag.trim().length === 0) {
    enqueueSnackbar('Tag cannot be empty');
    return;
  }
  const saveSnackBar = enqueueSnackbar('Saving...', {
    persist: true,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center',
    },
  });
  try {
    setDisabled(true);
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
  } finally {
    setDisabled(false);
    closeSnackbar(saveSnackBar);
  }
}

export const AddTag: React.FC<AddTagProps> = ({
  store,
  addTag,
}): JSX.Element => {
  const [tag, setTag] = React.useState<string>('');
  const [disabled, setDisabled] = React.useState<boolean>(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <Panel>
      <Typography variant="h4" gutterBottom>
        Add tag
      </Typography>
      <form
        className="flex"
        onSubmit={ev => {
          ev.preventDefault();
          save(
            tag,
            setTag,
            store,
            addTag,
            enqueueSnackbar,
            closeSnackbar,
            setDisabled,
          );
        }}
      >
        <TextField
          label="Name"
          variant="filled"
          size="small"
          style={{ width: '35%' }}
          value={tag}
          onChange={ev => setTag(ev.target.value)}
          disabled={disabled}
        />
        <div className="grow" />
        <section className="flex a-bottom">
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            disabled={disabled}
          >
            Save
          </Button>
        </section>
      </form>
    </Panel>
  );
};
