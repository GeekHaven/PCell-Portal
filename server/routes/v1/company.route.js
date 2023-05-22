import { Router } from 'express';
import {
  getPaginatedCompanies,
  getIndividualCompany,
  getRegisteredCompanies,
  registerUserToCompany,
} from '../../controllers/company.controller.js';

const router = Router();

router.get('/', getPaginatedCompanies);
router.get('/registered', getRegisteredCompanies);
router.get('/:id', getIndividualCompany);
router.post('/:id/register', registerUserToCompany);

export default router;
