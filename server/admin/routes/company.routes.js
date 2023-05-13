import { Router } from 'express';
import { upload } from '../../config/multer.config.js';
import { addCompany } from '../controllers/company.controller.js';

const router = Router();

router.post('/new', upload.single('logo'), addCompany);
export default router;
