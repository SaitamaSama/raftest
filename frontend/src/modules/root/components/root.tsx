import * as React from 'react';
import { AddPerson } from '../../panel/components/add-person';
import { AddTag } from '../../panel/components/add-tag';
import { EditRelation } from '../../panel/components/edit-relation';
import '../scss/root.scss';
import '../scss/base.scss';
import { Person } from '../../../../../backend/src/entities/person';
import { Tag } from '../../../../../backend/src/entities/tag';
import { addPerson, addTag } from '../util/store-manager';
import * as config from '../../../config.json';
import { Lists } from '../../list/components/lists';

export interface Store {
  people: Array<Person>;
  tags: Array<Tag>;
}

export const Root: React.FC<Record<string, unknown>> = (): JSX.Element => {
  const [tags, setTags] = React.useState<Array<Tag>>([]);
  const [people, setPeople] = React.useState<Array<Person>>([]);

  React.useEffect(() => {
    fetch(`${config.API_HOST}/person`)
      .then(response => response.json())
      .then(people => {
        setPeople(people);
      });
    fetch(`${config.API_HOST}/tag`)
      .then(response => response.json())
      .then(tags => {
        setTags(tags);
      });
  }, []);

  return (
    <section className="root">
      <section>
        <AddPerson store={people} addPerson={addPerson(setPeople)} />
        <AddTag store={tags} addTag={addTag(setTags)} />
        <EditRelation people={people} tags={tags} />
      </section>
      <section>
        <Lists people={people} tags={tags} />
      </section>
    </section>
  );
};
