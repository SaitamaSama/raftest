import { Request, Response } from 'express';
import { Tag } from '../../entities/tag';

export async function getTags(
  request: Request,
  response: Response,
): Promise<void> {
  const tagRepo = request.db.getRepository(Tag);
  const tags = await tagRepo.find();
  response.status(200).json(tags);
}
