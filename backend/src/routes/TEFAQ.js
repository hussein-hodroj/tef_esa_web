

import express from 'express';
import {getTefQData} from "../controllers/TEFAQ.js";

const router = express.Router();

router.get('/TEFAQ', getTefQData);

export default router;