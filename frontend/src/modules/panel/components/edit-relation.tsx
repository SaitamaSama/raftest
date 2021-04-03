import { Button, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import * as React from 'react';
import { Person } from '../../../../../backend/src/entities/person';
import { Tag } from '../../../../../backend/src/entities/tag';
import { Panel } from '../../common/components/panel';
import * as config from '../../../config.json';
import { useSnackbar } from 'notistack';
import { PanelInfo } from '../../common/components/panel-info';

export interface EditRelationProps {
  people: Array<Person>;
  tags: Array<Tag>;
  refresh: () => unknown;
}

async function save(
  enqueueSnackbar: Function,
  selectedSource: Person | undefined,
  selectedDestination: Person | undefined,
  tag: Tag | undefined,
  clear: () => void,
  closeSnackbar: Function,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> {
  if (!selectedSource || !selectedDestination || !tag) {
    enqueueSnackbar('All of the fields are required.');
    return;
  }
  if (selectedSource.id === selectedDestination.id) {
    enqueueSnackbar('Source and destination cannot be the same.');
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
    await fetch(`${config.API_HOST}/person`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: selectedSource,
        destination: selectedDestination,
        tag,
      }),
    });
    clear();
    enqueueSnackbar(
      `Successfully related ${selectedSource.name} and ${selectedDestination.name}`,
    );
  } catch (error) {
    console.error(error);
    enqueueSnackbar(`Error: ${JSON.stringify(error)}`, {
      variant: 'error',
    });
  } finally {
    closeSnackbar(saveSnackBar);
    setDisabled(false);
  }
}

export const EditRelation: React.FC<EditRelationProps> = ({
  people,
  tags,
  refresh,
}): JSX.Element => {
  const [selectedPersonSrc, setSelectedPersonSrc] = React.useState<Person>();
  const [selectedPersonDest, setSelectedPersonDest] = React.useState<Person>();
  const [selectedTag, setSelectedTag] = React.useState<Tag>();
  const [sourceTextInput, setSourceTextInput] = React.useState<string>('');
  const [destTextInput, setDestTextInput] = React.useState<string>('');
  const [tagTextInput, setTagTextInput] = React.useState<string>('');
  const [disabled, setDisabled] = React.useState<boolean>(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <Panel>
      <section className="header">
        <Typography variant="h4" gutterBottom>
          Edit relation
        </Typography>
        <PanelInfo info="Link two people with a relation tag. If a relation already exists, it will be overwritten upon saving." />
      </section>
      <form
        onSubmit={ev => {
          ev.preventDefault();
          save(
            enqueueSnackbar,
            selectedPersonSrc,
            selectedPersonDest,
            selectedTag,
            () => {
              setSelectedPersonSrc(undefined);
              setSelectedPersonDest(undefined);
              setSelectedTag(undefined);
              setSourceTextInput('');
              setDestTextInput('');
              setTagTextInput('');
              refresh();
            },
            closeSnackbar,
            setDisabled,
          );
        }}
      >
        <section className="flex">
          <Autocomplete
            options={people}
            getOptionLabel={option => option.name}
            value={selectedPersonSrc}
            inputValue={sourceTextInput}
            onInputChange={(_, value) => setSourceTextInput(value)}
            onChange={(_, person) => person && setSelectedPersonSrc(person)}
            style={{ width: '35%' }}
            selectOnFocus
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
            inputValue={destTextInput}
            onInputChange={(_, value) => setDestTextInput(value)}
            onChange={(_, person) => person && setSelectedPersonDest(person)}
            style={{ width: '35%' }}
            selectOnFocus
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
        </section>
        <section className="flex gap-top">
          <Autocomplete
            options={tags}
            getOptionLabel={option => option.value}
            value={selectedTag}
            inputValue={tagTextInput}
            onInputChange={(_, value) => setTagTextInput(value)}
            style={{ width: '35%' }}
            selectOnFocus
            onChange={(_, tag) => tag && setSelectedTag(tag)}
            renderInput={params => (
              <TextField
                {...params}
                variant="filled"
                label="Tag"
                placeholder="Relation between the people"
                fullWidth
                size="small"
              />
            )}
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
        </section>
      </form>
    </Panel>
  );
};
