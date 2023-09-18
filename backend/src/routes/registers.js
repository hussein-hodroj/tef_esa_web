import express from 'express';
import {registerCandidate, getInfo, upload} from '../controllers/register.js';

const router = express.Router();
router.get('/get', getInfo);
router.post('/' ,upload.single("PassportPhoto"), registerCandidate);


export default router;