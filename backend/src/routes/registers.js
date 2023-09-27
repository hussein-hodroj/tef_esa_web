import express from 'express';

import {registerCandidate, getInfo, upload, getCandidates, updateInfo, getCandidateById, deleteCandidate, getStatus} from '../controllers/register.js';


const router = express.Router();
router.get('/get', getInfo);
router.get('/getid/:CandidateID', getCandidateById);
router.post('/' ,upload.single("PassportPhoto"), registerCandidate);
router.get('/', getCandidates);
router.put('/update/:id', updateInfo); 
router.delete('/delete/:id', deleteCandidate); 
router.get('/status', getStatus );

export default router;