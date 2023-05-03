import { Router } from 'express';
import { logIn } from '../../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/login', logIn);

export default authRouter;