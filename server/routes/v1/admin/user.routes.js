import { getPaginatedUsers } from '../../../controllers/admin/user.controller.js';
import { Router } from 'express';

const router = Router();
router.get('/', getPaginatedUsers);
export default router;
