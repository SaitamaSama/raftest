import { Request, Response } from 'express';
import { Person } from '../../entities/person';

export async function getPerson(
  request: Request,
  response: Response,
): Promise<void> {
  const personRepo = request.db.getRepository(Person);
  const people = await personRepo.find();
  response.status(200).json(people);
}
