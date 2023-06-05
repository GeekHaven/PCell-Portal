import { Router } from 'express';
import authRoutes from './auth.route.js';
import userRoutes from './user.route.js';
import adminRoutes from './admin/index.js';
import companyRoutes from './company.route.js';
import publicRoutes from './public/index.js';
import { verifyUser } from '../../middleware/auth.middleware.js';
import postRoutes from './post.route.js';

var router = Router();

router.use('/auth', authRoutes);
router.use('/user', verifyUser, userRoutes);
router.use('/admin', verifyUser, adminRoutes);
router.use('/company', verifyUser, companyRoutes);
router.use('/public', publicRoutes);
router.use('/post', verifyUser,  postRoutes);

export default router;
