

import express from 'express';
import { countRegistrationsByDate, getTefCanadaData ,getTefCanadaDate} from '../controllers/TEFCanada.js';

const router = express.Router();

router.get('/TEFCanada', getTefCanadaData);

router.get('/TEFCanada-date', getTefCanadaDate);

router.get('/count-registrations-by-date', countRegistrationsByDate); 

export default router;