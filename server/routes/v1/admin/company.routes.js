import { Router } from 'express';
import { upload } from '../../../config/multer.config.js';
import {
  addCompany,
  getAllCompanies,
  getPaginatedCompanies,
} from '../../../controllers/admin/company.controller.js';

const router = Router();

router.get('/', getPaginatedCompanies);
router.get('/all', getAllCompanies);
router.post('/new', upload.single('logo'), addCompany);

export default router;
