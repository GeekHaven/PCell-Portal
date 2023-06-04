import { Router } from 'express';
import { getIndividualCompany } from '../../../controllers/public/company.controller.js';
const companyRouter = Router();

companyRouter.get('/:id', getIndividualCompany);

export default companyRouter;
