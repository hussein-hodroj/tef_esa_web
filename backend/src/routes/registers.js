import express from 'express';
import {registerCandidate, upload} from '../controllers/register.js';

const router = express.Router();

router.post('/' ,upload.single("PassportPhoto"), registerCandidate);


export default router;