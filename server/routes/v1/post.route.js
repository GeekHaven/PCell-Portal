import { Router } from 'express';

import {
    getPostById,
    getAllPosts,
    addComment,
    getComments,
    getReplies
} from '../../controllers/post.controller.js';

const router = Router();

router.get('/:postId', getPostById);
router.get('/', getAllPosts);
router.post('/comment', addComment);
router.get('/:postId/comments', getComments);
router.get('/:postId/comment/:commentId', getReplies);
router.post('/:postId/comment/:replyTo', addComment);

export default router;
