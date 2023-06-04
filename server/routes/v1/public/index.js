import { Router } from 'express';
import companyRoutes from './company.routes.js';

const publicRouter = Router();

publicRouter.use('/company', companyRoutes);

export default publicRouter;
