import { Router } from 'express';

import {
    addPost,
    getAllPosts,
} from '../../../controllers/admin/post.controller.js';

const router = Router();

router.get('/all', getAllPosts);
router.post('/new', addPost);

export default router;