import { Button, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { Person } from '../../../../../backend/src/entities/person';
import { Panel } from '../../common/components/panel';
import { Results } from './results';
import * as config from '../../../config.json';
import { Result } from '../../../../../backend/src/routers/search/graph';
import '../scss/search.scss';

export interface SearchProps {
  people: Array<Person>;
}

async function search(
  source: Person | undefined,
  to: Person | undefined,
  enqueueSnackbar: Function,
  closeSnackbar: Function,
  setResults: React.Dispatch<Array<Result>>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> {
  if (!source || !to) {
    enqueueSnackbar('Both fields are required to search.');
    return;
  }
  if (source.id === to.id) {
    enqueueSnackbar('They are the same person.');
    return;
  }
  const searchSnackBar = enqueueSnackbar('Searching...', {
    persist: true,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center',
    },
  });
  try {
    setDisabled(true);
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
    if (response.results.length === 0) {
      enqueueSnackbar('No relation found betwen the selected people.', {
        variant: 'error',
      });
    }

    setResults(response.results);
  } catch (error) {
    console.error(error);
  } finally {
    setDisabled(false);
    closeSnackbar(searchSnackBar);
  }
}

export const Search: React.FC<SearchProps> = ({ people }): JSX.Element => {
  const [selectedPersonSrc, setSelectedPersonSrc] = React.useState<Person>();
  const [selectedPersonDest, setSelectedPersonDest] = React.useState<Person>();
  const [sourcePersonText, setSourcePersonText] = React.useState<string>('');
  const [destPersonText, setDestPersonText] = React.useState<string>('');
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [results, setResults] = React.useState<Array<Result>>([]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <>
      <Panel className="search-panel">
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
              closeSnackbar,
              setResults,
              setDisabled,
            );
          }}
        >
          <Autocomplete
            options={people}
            getOptionLabel={option => option.name}
            value={selectedPersonSrc}
            inputValue={sourcePersonText}
            onInputChange={(_, value) => setSourcePersonText(value)}
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
            disabled={disabled}
          />
          <section className="grow flex center">
            <Typography variant="body2">and</Typography>
          </section>
          <Autocomplete
            options={people}
            getOptionLabel={option => option.name}
            value={selectedPersonDest}
            inputValue={destPersonText}
            onInputChange={(_, value) => setDestPersonText(value)}
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
            disabled={disabled}
          />
          <section className="flex a-bottom" style={{ marginLeft: '1rem' }}>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={disabled}
            >
              Search
            </Button>
          </section>
        </form>
      </Panel>
      {results && <Results results={results} people={people} />}
    </>
  );
};
