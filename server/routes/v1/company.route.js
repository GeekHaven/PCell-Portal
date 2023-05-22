import { Router } from 'express';
import {
  getPaginatedCompanies,
  getIndividualCompany,
  getRegisteredCompanies,
  registerUserToCompany,
} from '../../controllers/company.controller.js';
import { verifyUser } from '../../middleware/auth.middleware.js';

const router = Router();

router.get('/', verifyUser, getPaginatedCompanies);
router.get('/registered', verifyUser, getRegisteredCompanies);
router.get('/:id', verifyUser, getIndividualCompany);
router.post('/:id/register', verifyUser, registerUserToCompany);

