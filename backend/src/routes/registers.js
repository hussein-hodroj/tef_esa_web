import express from 'express';
import {registerCandidate, getInfo, upload, getCandidates} from '../controllers/register.js';

const router = express.Router();
router.get('/get', getInfo);
router.post('/' ,upload.single("PassportPhoto"), registerCandidate);
router.get('/', getCandidates);


export default router;