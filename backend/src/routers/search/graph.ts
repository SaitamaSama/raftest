import { Request, Response } from 'express';
import { Person } from '../../entities/person';
import { Graph } from 'graphlib';
//@ts-ignore
import { ksp } from 'k-shortest-path';

export interface ResultEdge {
  fromNode: string;
  toNode: string;
  weight: number;
}

export interface Result {
  totalCost: number;
  edges: Array<ResultEdge>;
}

export async function graph(
  request: Request,
  response: Response,
): Promise<void> {
  const { from, to } = request.body as { from: Person; to: Person };
  const personRepo = request.db.getRepository(Person);

  const people = await personRepo.find();

  const graph = new Graph({ directed: true });
  // Adding edges to the graph
  people.forEach(person => {
    person.related.forEach((related, index) => {
      graph.setEdge(
        person.id.toString(),
        related.toString(),
        person.tags[index],
      );
    });
  });

  // Searching for (k=50 default) k shortest paths between `from` and `to`
  let k = 50;
  if (
    process.env.PATH_FINDING_K &&
    parseInt(process.env.PATH_FINDING_K) !== NaN
  ) {
    k = parseInt(process.env.PATH_FINDING_K);
  }
  try {
    const results: Array<Array<Result>> = ksp(
      graph,
      from.id.toString(),
      to.id.toString(),
      k,
    );

    response.json({
      results,
    });
  } catch (error) {
    response.json({
      results: [],
    });
  }
}
