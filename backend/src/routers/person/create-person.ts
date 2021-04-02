import { Request, Response } from 'express';
import { Person } from '../../entities/person';

export async function createPerson(
  request: Request,
  response: Response,
): Promise<void> {
  const { name } = request.body;
  if (!name) {
    response.status(400).json({ message: "Invalid param 'name'" });
    return;
  }
  if (name.trim().length === 0) {
    response
      .status(400)
      .json({ message: 'Name cannot be blank or just spaces' });
    return;
  }

  try {
    const personRepo = request.db.getRepository(Person);
    const person = await personRepo.save(new Person(name));

    response.status(200).json({
      success: true,
      person,
    });
  } catch (error) {
    response.status(500).json({ error });
  }
}
