import { Button, TextField, Typography } from '@material-ui/core';
import * as React from 'react';
import { Panel } from '../../common/components/panel';
import { DispatchedAction } from '../../root/util/store-manager';
import * as config from '../../../config.json';
import { Person } from '../../../../../backend/src/entities/person';

export interface AddPersonProps {
  store: Array<Person>;
  addPerson: DispatchedAction<Array<Person>, Person>;
}

async function save(
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>,
  store: Array<Person>,
  addPerson: DispatchedAction<Array<Person>, Person>,
): Promise<void> {
  try {
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
    console.error(error);
  }
}

export const AddPerson: React.FC<AddPersonProps> = ({
  store,
  addPerson,
}): JSX.Element => {
  const [name, setName] = React.useState<string>('');

  return (
    <Panel>
      <Typography variant="h4" gutterBottom>
        Add person
      </Typography>
      <form
        className="flex"
        onSubmit={ev => {
          ev.preventDefault();
          save(name, setName, store, addPerson);
        }}
      >
        <TextField
          label="Name"
          variant="filled"
          size="small"
          style={{ width: '35%' }}
          value={name}
          onChange={ev => setName(ev.target.value)}
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
