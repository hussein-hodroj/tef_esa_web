

import express from 'express';
import {getTefEtudeData, getTefEtudeDate} from '../controllers/TEFEtudes.js';

const router = express.Router();

router.get('/TEFEtudes', getTefEtudeData);

router.get('/TEFEtude-date', getTefEtudeDate);

export default router;