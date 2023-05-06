import { getPaginatedUsers } from '../controllers/user.controller.js';
import { Router } from 'express';
const router = Router();
router.get('/', getPaginatedUsers);
export default router;
