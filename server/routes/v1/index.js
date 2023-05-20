import { Router } from 'express';
import authRoutes from './auth.route.js';
import userRoutes from './user.route.js';
import adminRoutes from './admin/index.js';
var router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/admin', adminRoutes);
export default router;
