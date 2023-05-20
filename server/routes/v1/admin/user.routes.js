import {
  getPaginatedUsers,
  getUserGroups,
  searchUserByRollNumber,
} from '../../../controllers/admin/user.controller.js';
import { Router } from 'express';

const router = Router();
router.get('/', getPaginatedUsers);
router.get('/groups', getUserGroups);
router.get('/getUsers', searchUserByRollNumber);

export default router;
