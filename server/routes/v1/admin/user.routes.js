import {
  getPaginatedUsers,
  getUserGroups,
  searchUserByRollNumberOrName,
  getUsersEligibleForTarget,
} from '../../../controllers/admin/user.controller.js';
import { Router } from 'express';

const router = Router();
router.get('/', getPaginatedUsers);
router.get('/groups', getUserGroups);
router.get('/getUsers', searchUserByRollNumberOrName);
router.post('/targetEligible', getUsersEligibleForTarget);

export default router;
