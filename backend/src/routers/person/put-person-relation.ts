import { Request, Response } from 'express';
import { Person } from '../../entities/person';
import { Tag } from '../../entities/tag';

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
  if (!sourceFromDB) {
    response.status(404).json({
      message: 'Person not found.',
    });
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
