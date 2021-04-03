import { Dispatch, SetStateAction } from 'react';
import { Person } from '../../../../../backend/src/entities/person';
import { Tag } from '../../../../../backend/src/entities/tag';

export type DispatchedAction<K, T> = (store: K, param: T) => void;

export function addPerson(
  setStore: Dispatch<SetStateAction<Array<Person>>>,
): DispatchedAction<Array<Person>, Person> {
  return (store: Array<Person>, person: Person) => {
    setStore([...store, person]);
  };
}

export function addTag(
  setStore: Dispatch<SetStateAction<Array<Tag>>>,
): DispatchedAction<Array<Tag>, Tag> {
  return (store: Array<Tag>, tag: Tag) => {
    setStore([...store, tag]);
  };
}

export function editTag(
  setTags: Dispatch<SetStateAction<Array<Tag>>>,
): DispatchedAction<Array<Tag>, Tag> {
  return (tags: Array<Tag>, tag: Tag) => {
    const index = tags.findIndex(t => t.id === t.id);
    tags[index] = tag;
    setTags(tags);
  };
}
