import { Router } from 'express';

import {
    addNotification,
    getAllNotifications,
} from '../../../controllers/admin/notification.controller.js';

const router = Router();

router.get('/all', getAllNotifications);
router.post('/new', addNotification);

export default router;