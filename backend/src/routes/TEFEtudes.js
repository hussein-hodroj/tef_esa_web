

import express from 'express';
import {getTefEtudeData} from '../controllers/TEFEtudes.js';

const router = express.Router();

router.get('/TEFEtudes', getTefEtudeData);

export default router;