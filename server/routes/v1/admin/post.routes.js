import { Router } from 'express';
import {
  addPost,
  getPostById,
  getAllPosts,
  addComment,
  getComments,
  getReplies,
  deletePostById,
  deleteCommentById,
  updateCommentById,
} from '../../../controllers/admin/post.controller.js';

const router = Router();

//Post Routes
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/new', addPost);
router.delete('/:id', deletePostById);

//Comment Routes
router.post('/comment', addComment);
router.get('/:id/comments', getComments);
router.get('/:postId/comment/:id', getReplies);
router.delete('/:postId/comment/:id', deleteCommentById);
router.patch('/:postId/comment/:id', updateCommentById);

export default router;
