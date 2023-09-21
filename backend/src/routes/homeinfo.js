import express from 'express';
import {
  getHomeinfoData,
  createHomeinfoData, 
  updateHomeinfoData,
  deleteHomeinfoData,
} from '../controllers/homeinfo.js';

const router = express.Router();

router.get('/getHomeinfoData/:type', getHomeinfoData);
router.post('/createHomeinfoData', createHomeinfoData); 
router.put('/updateHomeinfoData/:id', updateHomeinfoData);
router.delete('/deleteHomeinfoData/:id', deleteHomeinfoData);

export default router;
