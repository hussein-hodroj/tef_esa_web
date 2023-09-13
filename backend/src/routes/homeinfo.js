
import express from 'express';
import {getHomeinfoData} from '../controllers/homeinfo.js';

const router = express.Router();

router.get('/homeinfo', getHomeinfoData);

export default router;