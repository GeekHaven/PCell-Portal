import { Router } from 'express';
import userRouter from './user.routes.js';
import companyRouter from './company.routes.js';
import notificationRouter from './notification.routes.js';

const router = Router();
router.use('/user', userRouter);
router.use('/company', companyRouter);
router.use('/notification', notificationRouter);
export default router;
