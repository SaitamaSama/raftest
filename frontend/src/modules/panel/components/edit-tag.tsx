import { Button, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { Tag } from '../../../../../backend/src/entities/tag';
import { Panel } from '../../common/components/panel';
import { DispatchedAction } from '../../root/util/store-manager';
import * as config from '../../../config.json';
import { PanelInfo } from '../../common/components/panel-info';

export interface EditTagProps {
  tags: Array<Tag>;
  editTags: DispatchedAction<Array<Tag>, Tag>;
}

async function save(
  tags: Array<Tag>,
  selectedTag: Tag | undefined,
  newName: string,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  enqueueSnackbar: Function,
  closeSnackbar: Function,
  editTags: DispatchedAction<Array<Tag>, Tag>,
  clear: () => void,
): Promise<void> {
  if (!selectedTag) {
    enqueueSnackbar('Select a tag to edit');
    return;
  }
  if (newName.trim().length === 0) {
    enqueueSnackbar('Tag name cannot be empty');
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
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tag: selectedTag,
        newName,
      }),
    });

    const response = await request.json();
    editTags(tags, response.tag);
    clear();
  } catch (error) {
    enqueueSnackbar(`Error: ${JSON.stringify(error)}`, {
      variant: 'error',
    });
  } finally {
    closeSnackbar(saveSnackBar);
    setDisabled(false);
  }
}

export const EditTag: React.FC<EditTagProps> = ({
  tags,
  editTags,
}): JSX.Element => {
  const [selectedTag, setSelectedTag] = React.useState<Tag>();
  const [selectedTagText, setSelectedTagText] = React.useState<string>('');
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [newTagName, setNewTagName] = React.useState<string>('');

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <Panel>
      <section className="header">
        <Typography variant="h4" gutterBottom>
          Edit tag
        </Typography>
        <PanelInfo info="Edit previously created tags here" />
      </section>
      <form
        className="flex"
        onSubmit={ev => {
          ev.preventDefault();
          save(
            tags,
            selectedTag,
            newTagName,
            setDisabled,
            enqueueSnackbar,
            closeSnackbar,
            editTags,
            () => {
              setSelectedTag(undefined);
              setSelectedTagText('');
              setNewTagName('');
            },
          );
        }}
      >
        <Autocomplete
          options={tags}
          getOptionLabel={option => option.value}
          value={selectedTag}
          inputValue={selectedTagText}
          onInputChange={(_, value) => setSelectedTagText(value)}
          style={{ width: '35%', flexGrow: 1 }}
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
        <TextField
          value={newTagName}
          onChange={ev => setNewTagName(ev.target.value)}
          variant="filled"
          size="small"
          label="New tag name"
          className="grow"
          disabled={disabled}
        />
        <div className="grow" />
        <section className="flex a-bottom">
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={disabled}
          >
            Save
          </Button>
        </section>
      </form>
    </Panel>
  );
};
