

import express from 'express';
import { getTefCanadaData ,getTefCanadaDate} from '../controllers/TEFCanada.js';

const router = express.Router();

router.get('/TEFCanada', getTefCanadaData);

router.get('/TEFCanada-date', getTefCanadaDate);



export default router;