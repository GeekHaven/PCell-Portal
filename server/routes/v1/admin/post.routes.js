import { Router } from 'express';

import {
  addPost,
  getPostById,
  getAllPosts,
} from '../../../controllers/admin/post.controller.js';

const router = Router();

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/new', addPost);

export default router;