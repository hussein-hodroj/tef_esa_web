

import express from 'express';
import {getTefEtudeData, getTefEtudeDate,countRegistrationsByDate} from '../controllers/TEFEtudes.js';


const router = express.Router();

router.get('/TEFEtudes', getTefEtudeData);

router.get('/TEFEtude-date', getTefEtudeDate);
router.get('/count-registrations-by-date', countRegistrationsByDate); 

export default router;