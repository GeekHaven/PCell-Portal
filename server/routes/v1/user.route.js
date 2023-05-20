import {
  getUserData,
  updateCourseDetails,
  saveChanges,
  // getPaginatedCompanies,
} from '../../controllers/user.controller.js';
import { Router } from 'express';
import { verifyUser } from '../../middleware/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', verifyUser, getUserData);
userRouter.post('/updateCourseDetails', verifyUser, updateCourseDetails);
userRouter.post('/saveChanges', verifyUser, saveChanges);
// userRouter.get('/getCompanies', verifyUser, getPaginatedCompanies);

export default userRouter;
