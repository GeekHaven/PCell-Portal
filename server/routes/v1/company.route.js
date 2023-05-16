import { Router } from 'express';
import { getPaginatedCompanies } from '../../controllers/company.controller';

const router = Router();

router.get('/', getPaginatedCompanies);
