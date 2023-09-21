

import express from 'express';
import {getTEFAQDate, getTefQData} from "../controllers/TEFAQ.js";

const router = express.Router();

router.get('/TEFAQ', getTefQData);
router.get('/TEFAQ-date', getTEFAQDate);

export default router;