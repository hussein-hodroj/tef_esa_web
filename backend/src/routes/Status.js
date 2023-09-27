import express from 'express';
import { deleteLockDate, getLockDate, getTitle, insertLockDate, updateLockDate } from '../controllers/Status.js';


const router = express.Router();
router.get('/status', getLockDate);
router.delete('/status/:id', deleteLockDate);
router.get('/titles', getTitle);
router.post('/add',insertLockDate);
router.put('/status/:id', updateLockDate);
export default router;
