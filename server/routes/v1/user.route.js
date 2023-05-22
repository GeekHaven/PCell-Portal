import {
  getUserData,
  updateCourseDetails,
  saveChanges,
} from '../../controllers/user.controller.js';
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', getUserData);
userRouter.post('/updateCourseDetails', updateCourseDetails);
userRouter.post('/saveChanges', saveChanges);

export default userRouter;
