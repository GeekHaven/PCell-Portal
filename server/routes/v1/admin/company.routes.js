import { Router } from 'express';
import { upload } from '../../../config/multer.config.js';
import {
  addCompany,
  getPaginatedCompanies,
} from '../../../controllers/admin/company.controller.js';

const router = Router();

router.get('/', getPaginatedCompanies);
router.post('/new', upload.single('logo'), addCompany);

export default router;
