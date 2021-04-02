import { Router } from 'express';
import { createTag } from './tag/create-tag';
import { getTags } from './tag/get-tags';

const router = Router();

router.get('/', getTags);
router.post('/', createTag);

export { router as TagRouter };
