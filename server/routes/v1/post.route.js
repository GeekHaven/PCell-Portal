import { Router } from 'express';

import {
  getPostById,
  getAllPosts,
  addComment,
  getComments,
  getReplies,
  updateCommentById,
  deleteCommentById,
} from '../../controllers/post.controller.js';

const router = Router();

router.get('/:postId', getPostById);
router.get('/', getAllPosts);
router.post('/comment', addComment);
router.get('/:postId/comments', getComments);
router.get('/:postId/comment/:commentId', getReplies);
router.post('/:postId/comment/:replyTo', addComment);
router.patch('/:postId/comment/:commentId', updateCommentById);
router.delete('/:postId/comment/:commentId', deleteCommentById);

export default router;
