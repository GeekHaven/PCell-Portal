import { Router } from 'express';
import {
  logIn,
  isUser,
  isUserAdmin,
} from '../../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/login', logIn);
authRouter.get('/verify', isUser);
authRouter.get('/isAdmin', isUserAdmin);

export default authRouter;
