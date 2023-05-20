import { Router } from 'express';
import userRouter from './user.routes.js';
import companyRouter from './company.routes.js';

const router = Router();
router.use('/user', userRouter);
router.use('/company', companyRouter);
export default router;
