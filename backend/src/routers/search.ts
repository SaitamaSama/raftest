import { Router } from 'express';
import { graph } from './search/graph';

const router = Router();

router.post('/', graph);

export { router as SearchRouter };
