import express from 'express';
import {registerCandidate, getInfo, upload, getCandidates, updateInfo, getCandidateById, deleteCandidate} from '../controllers/Register.js';

const router = express.Router();
router.get('/get', getInfo);
router.get('/getid/:CandidateID', getCandidateById);
router.post('/' ,upload.single("PassportPhoto"), registerCandidate);
router.get('/', getCandidates);
router.put('/update/:id', updateInfo); 
router.delete('/delete/:id', deleteCandidate); 


export default router;