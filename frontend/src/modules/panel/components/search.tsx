import { Button, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { Person } from '../../../../../backend/src/entities/person';
import { Panel } from '../../common/components/panel';
import { Results } from './results';
import * as config from '../../../config.json';

export interface SearchProps {
  people: Array<Person>;
}

async function search(
  source: Person | undefined,
  to: Person | undefined,
  enqueueSnackbar: Function,
  setResults: React.Dispatch<any>,
): Promise<void> {
  if (!source || !to) {
    enqueueSnackbar('Both fields are required to search.');
    return;
  }
  if (source.id === to.id) {
    enqueueSnackbar('They are the same person.');
    return;
  }
  try {
    const request = await fetch(`${config.API_HOST}/search`, {
      method: 'POST',
      body: JSON.stringify({
        from: source,
        to,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await request.json();
  } catch (error) {
    console.error(error);
  }
}

export const Search: React.FC<SearchProps> = ({ people }): JSX.Element => {
  const [selectedPersonSrc, setSelectedPersonSrc] = React.useState<Person>();
  const [selectedPersonDest, setSelectedPersonDest] = React.useState<Person>();
  const [results, setResults] = React.useState<any>();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <>
      <Panel>
        <Typography variant="h4" gutterBottom>
          Seach for links
        </Typography>
        <form
          className="flex"
          onSubmit={ev => {
            ev.preventDefault();
            search(
              selectedPersonSrc,
              selectedPersonDest,
              enqueueSnackbar,
              setResults,
            );
          }}
        >
          <Autocomplete
            options={people}
            getOptionLabel={option => option.name}
            value={selectedPersonSrc}
            onChange={(_, person) => person && setSelectedPersonSrc(person)}
            style={{ width: '35%' }}
            renderInput={params => (
              <TextField
                {...params}
                variant="filled"
                label="Person to be tagged from"
                placeholder="Relate them"
                fullWidth
                size="small"
              />
            )}
          />
          <section className="grow flex center">
            <Typography variant="body2">and</Typography>
          </section>
          <Autocomplete
            options={people}
            getOptionLabel={option => option.name}
            value={selectedPersonDest}
            onChange={(_, person) => person && setSelectedPersonDest(person)}
            style={{ width: '35%' }}
            renderInput={params => (
              <TextField
                {...params}
                variant="filled"
                label="Person to be tagged to"
                placeholder="Relate them"
                fullWidth
                size="small"
              />
            )}
          />
          <section className="flex a-bottom" style={{ marginLeft: '1rem' }}>
            <Button variant="contained" color="secondary">
              Search
            </Button>
          </section>
        </form>
      </Panel>
      {results && <Results />}
    </>
  );
};
