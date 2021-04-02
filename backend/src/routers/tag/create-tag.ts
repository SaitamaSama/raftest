import { Request, Response } from 'express';
import { Person } from '../../entities/person';
import { Tag } from '../../entities/tag';

export async function createTag(
  request: Request,
  response: Response,
): Promise<void> {
  const { value } = request.body;
  if (!value) {
    response.status(400).json({ message: "Invalid param 'value'" });
    return;
  }
  if (value.trim().length === 0) {
    response
      .status(400)
      .json({ message: 'Value cannot be blank or just spaces' });
    return;
  }

  try {
    const tagRepo = request.db.getRepository(Tag);
    const tag = await tagRepo.save(new Tag(value));

    response.status(200).json({
      success: true,
      tag,
    });
  } catch (error) {
    response.status(500).json({ error });
  }
}
