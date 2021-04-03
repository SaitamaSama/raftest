import { Router } from 'express';
import { createTag } from './tag/create-tag';
import { editTag } from './tag/edit-tag';
import { getTags } from './tag/get-tags';

const router = Router();

router.get('/', getTags);
router.post('/', createTag);
router.put('/', editTag);

export { router as TagRouter };
