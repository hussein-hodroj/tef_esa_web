import express from 'express';
import {
  getHomepageData,
  updateHomepageData,
  deleteHomepageData,
} from '../controllers/homepage.js';

const router = express.Router();


router.get('/homepage', getHomepageData);


router.put('/homepage/:id', updateHomepageData);


router.delete('/homepage/:id', deleteHomepageData);

export default router;
