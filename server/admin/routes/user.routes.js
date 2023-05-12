import { getPaginatedUsers, addCompany } from '../controllers/user.controller.js';
import { Router } from 'express';
import upload from '../config/multer.config.js';
import { verifyAdmin } from '../middleware/auth.middleware.js';

const router = Router();
router.get('/', getPaginatedUsers);
router.post('/addCompany', upload.single('logo') , addCompany);
export default router;
