

import express from 'express';
import {countRegistrationsByDate, getTEFAQDate, getTefQData} from "../controllers/TEFAQ.js";

const router = express.Router();

router.get('/TEFAQ', getTefQData);
router.get('/TEFAQ-date', getTEFAQDate);
router.get('/count-registrations-by-date', countRegistrationsByDate); 

export default router;