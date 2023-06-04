import { Router } from 'express';

import {
    getPostById,
    getAllPosts
} from '../../controllers/post.controller';

const router = Router();

router.get('/:postId', getPostById);
router.get('/', getAllPosts);

export default router;
