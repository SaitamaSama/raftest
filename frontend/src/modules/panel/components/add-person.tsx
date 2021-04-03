import { Button, TextField, Typography } from '@material-ui/core';
import * as React from 'react';
import { Panel } from '../../common/components/panel';
import { DispatchedAction } from '../../root/util/store-manager';
import * as config from '../../../config.json';
import { Person } from '../../../../../backend/src/entities/person';
import { useSnackbar } from 'notistack';
import { PanelInfo } from '../../common/components/panel-info';

export interface AddPersonProps {
  store: Array<Person>;
  addPerson: DispatchedAction<Array<Person>, Person>;
}

async function save(
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>,
  store: Array<Person>,
  addPerson: DispatchedAction<Array<Person>, Person>,
  enqueueSnackbar: Function,
  closeSnackbar: Function,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> {
  if (name.trim().length === 0) {
    enqueueSnackbar('Name cannot be empty.');
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
    const request = await fetch(`${config.API_HOST}/person`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
      }),
    });
    const response = await request.json();
    addPerson(store, response.person);
    setName('');
  } catch (error) {
    enqueueSnackbar(`Error: ${JSON.stringify(error)}`, {
      variant: 'error',
    });
  } finally {
    setDisabled(false);
    closeSnackbar(saveSnackBar);
  }
}

export const AddPerson: React.FC<AddPersonProps> = ({
  store,
  addPerson,
}): JSX.Element => {
  const [name, setName] = React.useState<string>('');
  const [disabled, setDisabled] = React.useState<boolean>(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <Panel>
      <section className="header">
        <Typography variant="h4" gutterBottom>
          Add person
        </Typography>
        <PanelInfo info="Add a person to relate and search" />
      </section>
      <form
        className="flex"
        onSubmit={ev => {
          ev.preventDefault();
          save(
            name,
            setName,
            store,
            addPerson,
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
          value={name}
          onChange={ev => setName(ev.target.value)}
          disabled={disabled}
        />
        <div className="grow" />
        <section className="flex a-bottom">
          <Button
            variant="contained"
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
