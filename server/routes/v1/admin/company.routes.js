import { Router } from 'express';
import { upload } from '../../../config/multer.config.js';
import {
  addCompany,
  getAllCompanies,
  getPaginatedCompanies,
  getCompanyById,
  getUsersRelatedToCompany,
  batchUpdateUsersRelatedToCompany,
  setCompanyVisibility,
  setCompanyStatus,
  deleteCompany,
  updateCompany,
} from '../../../controllers/admin/company.controller.js';

const router = Router();

router.get('/', getPaginatedCompanies);
router.get('/all', getAllCompanies);
router.get('/:id', getCompanyById);
router.post('/new', upload.single('logo'), addCompany);
router.get('/:id/users', getUsersRelatedToCompany);
router.post('/:id/users/update', batchUpdateUsersRelatedToCompany);
router.post('/:id/hidden', setCompanyVisibility);
router.post('/:id/status', setCompanyStatus);
router.delete('/:id', deleteCompany);
router.patch('/:id', upload.single('logo'), updateCompany);

export default router;
