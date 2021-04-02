import { Button, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import * as React from 'react';
import { Person } from '../../../../../backend/src/entities/person';
import { Tag } from '../../../../../backend/src/entities/tag';
import { Panel } from '../../common/components/panel';
import * as config from '../../../config.json';

export interface EditRelationProps {
  people: Array<Person>;
  tags: Array<Tag>;
}

async function save(
  selectedSource: Person,
  destinationSource: Person,
  tag: Tag,
): Promise<void> {
  try {
    const request = await fetch(`${config.API_HOST}/person`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: selectedSource,
        destination: destinationSource,
        tag,
      }),
    });
  } catch (error) {
    console.error(error);
  }
}

export const EditRelation: React.FC<EditRelationProps> = ({
  people,
  tags,
}): JSX.Element => {
  const [selectedPersonSrc, setSelectedPersonSrc] = React.useState<Person>();
  const [selectedPersonDest, setSelectedPersonDest] = React.useState<Person>();
  const [selectedTag, setSelectedTag] = React.useState<Tag>();
  return (
    <Panel>
      <Typography variant="h4" gutterBottom>
        Edit relation
      </Typography>
      <form
        onSubmit={ev => {
          ev.preventDefault();
          if (!selectedPersonDest || !selectedPersonSrc || !selectedTag) return;
          save(selectedPersonSrc, selectedPersonDest, selectedTag);
        }}
      >
        <section className="flex">
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
        </section>
        <section className="flex gap-top">
          <Autocomplete
            options={tags}
            getOptionLabel={option => option.value}
            value={selectedTag}
            style={{ width: '35%' }}
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
          />
          <div className="grow" />
          <section className="flex a-bottom">
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </section>
        </section>
      </form>
    </Panel>
  );
};
