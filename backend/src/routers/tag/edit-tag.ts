import { Request, Response } from 'express';
import { Tag } from '../../entities/tag';

export async function editTag(
  request: Request,
  response: Response,
): Promise<void> {
  const { tag, newName } = request.body as { tag: Tag; newName: string };
  if (!tag || !newName) {
    response.status(400).json({ error: 'Invalid params provided' });
    return;
  }
  if (newName.trim().length === 0) {
    response.status(400).json({ error: 'New name cannot be empty' });
    return;
  }

  try {
    const tagRepo = request.db.getRepository(Tag);
    const newTag = await tagRepo.save(new Tag(newName).composeWithID(tag.id));

    response.status(200).json({ tag: newTag });
  } catch (error) {
    response.status(500).json({ error });
  }
}
