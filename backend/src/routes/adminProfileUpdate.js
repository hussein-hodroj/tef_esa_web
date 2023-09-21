import express from 'express';
import {updateAdminProfile,getAdminProfile } from '../controllers/adminProfileUpdate.js';



const router = express.Router();


router.put('/profile/:adminID', updateAdminProfile);

router.get('/profile/:adminID', getAdminProfile); 

export default router;
