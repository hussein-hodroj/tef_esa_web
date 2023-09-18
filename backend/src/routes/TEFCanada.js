

import express from 'express';
import { getTefCanadaData } from '../controllers/TEFCanada.js';

const router = express.Router();

router.get('/TEFCanada', getTefCanadaData);

export default router;