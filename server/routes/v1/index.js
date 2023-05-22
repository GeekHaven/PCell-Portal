import { Router } from 'express';
import authRoutes from './auth.route.js';
import userRoutes from './user.route.js';
import adminRoutes from './admin/index.js';
import companyRoutes from './company.route.js';
import { verifyUser } from '../../middleware/auth.middleware.js';

var router = Router();

router.use('/auth', authRoutes);
router.use('/user', verifyUser, userRoutes);
router.use('/admin', adminRoutes);
router.use('/company', verifyUser, companyRoutes);
export default router;
