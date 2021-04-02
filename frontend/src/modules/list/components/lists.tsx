import * as React from 'react';
import { LatestPeople } from './latest-people';
import { LatestTags } from './latest-tags';
import '../scss/lists.scss';
import { Person } from '../../../../../backend/src/entities/person';
import { Tag } from '../../../../../backend/src/entities/tag';

export interface ListProps {
  people: Array<Person>;
  tags: Array<Tag>;
}

export const Lists: React.FC<ListProps> = (props): JSX.Element => {
  return (
    <section className="lists-container">
      <LatestPeople {...props} />
      <LatestTags {...props} />
    </section>
  );
};
