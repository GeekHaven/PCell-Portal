import {
  getUserData,
  updateCourseDetails,
  saveChanges,
} from '../../controllers/user.controller.js';
import { Router } from 'express';
import { verifyUser } from '../../middleware/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', verifyUser, getUserData);
userRouter.post('/updateCourseDetails', verifyUser, updateCourseDetails);
userRouter.post('/saveChanges', verifyUser, saveChanges);

export default userRouter;
