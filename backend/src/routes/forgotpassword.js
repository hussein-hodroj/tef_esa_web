import express from 'express';
import forgotPassword from '../controllers/forgotPassword.js';
const router =express.Router();



router.post('/forget-password',forgotPassword);

export default router;