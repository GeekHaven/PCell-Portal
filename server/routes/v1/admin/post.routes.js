import { Router } from 'express';
import {
  addPost,
  getPostById,
  getAllPosts,
  addComment,
  getComments,
  getReplies,
  deletePostById,
} from '../../../controllers/admin/post.controller.js';

const router = Router();

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/new', addPost);
router.post('/comment', addComment);
router.get('/:id/comments', getComments);
router.get('/:postId/comment/:id', getReplies);
router.delete('/:id', deletePostById);

export default router;
