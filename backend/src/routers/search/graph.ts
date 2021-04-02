import { Request, Response } from 'express';
import { Person } from '../../entities/person';

export async function graph(
  request: Request,
  response: Response,
): Promise<void> {
  const { from, to } = request.body as { from: Person; to: Person };
  const personRepo = request.db.getRepository(Person);

  const people = await personRepo.find();

  console.log(JSON.stringify({ from, to }));
  console.log(JSON.stringify(people));

  response.json({});
}
