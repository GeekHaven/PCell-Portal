import { Router } from 'express';
import { logIn, isUser } from '../../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/login', logIn);
authRouter.get('/verify', isUser);

export default authRouter;
