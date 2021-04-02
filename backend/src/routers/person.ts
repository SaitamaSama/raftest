import { Router } from 'express';
import { createPerson } from './person/create-person';
import { getPerson } from './person/get-person';
import { putPersonRelation } from './person/put-person-relation';

const router = Router();

router.get('/', getPerson);
router.post('/', createPerson);
router.put('/', putPersonRelation);

export { router as PersonRouter };
