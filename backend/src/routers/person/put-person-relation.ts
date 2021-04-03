import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Person } from '../../entities/person';
import { Tag } from '../../entities/tag';

async function editRelation(
  personRepo: Repository<Person>,
  source: Person,
  destination: Person,
  tag: Tag,
  srcRelatedIndex: number,
  destRelatedIndex: number,
) {
  source.tags[srcRelatedIndex] = tag.id;
  destination.tags[destRelatedIndex] = tag.id;
  await personRepo.save(
    new Person(source.name).composeWithID(
      source.id,
      source.name,
      source.tags,
      source.related,
    ),
  );
  await personRepo.save(
    new Person(destination.name).composeWithID(
      destination.id,
      destination.name,
      destination.tags,
      destination.related,
    ),
  );
}

export async function putPersonRelation(
  request: Request,
  response: Response,
): Promise<void> {
  const { source, destination, tag } = request.body as {
    source: Person;
    destination: Person;
    tag: Tag;
  };

  const personRepo = request.db.getRepository(Person);

  // TODO
  // We need to check if some relation already exists between them
  // If so, need to update the tag, not the entire thing
  const sourceFromDB = await personRepo.findOne({
    id: source.id,
  });
  const destinationFromDB = await personRepo.findOne({
    id: destination.id,
  });
  if (!sourceFromDB || !destinationFromDB) {
    response.status(404).json({
      message: 'Person not found.',
    });
    return;
  }

  const srcRelatedIndex = sourceFromDB.related.indexOf(destination.id);
  const destRelatedIndex = destinationFromDB.related.indexOf(source.id);
  if (srcRelatedIndex !== -1 || destRelatedIndex !== -1) {
    // Then the relation exists
    await editRelation(
      personRepo,
      sourceFromDB,
      destinationFromDB,
      tag,
      srcRelatedIndex,
      destRelatedIndex,
    );
    response.status(204).json({ success: true });

    return;
  }

  const updatedSourcePerson = new Person(source.name).composeWithID(
    source.id,
    source.name,
    [...source.tags, tag.id],
    [...source.related, destination.id],
  );
  await personRepo.save(updatedSourcePerson);
  const updatedDestinationPerson = new Person(destination.name).composeWithID(
    destination.id,
    destination.name,
    [...destination.tags, tag.id],
    [...destination.related, source.id],
  );
  await personRepo.save(updatedDestinationPerson);

  response.status(204).json({ success: true });
}
