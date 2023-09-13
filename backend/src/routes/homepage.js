
import express from 'express';
import {getHomepageData} from '../controllers/homepage.js';

const router = express.Router();

router.get('/homepage', getHomepageData);


export default router;