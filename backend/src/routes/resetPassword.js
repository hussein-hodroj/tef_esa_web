import express from 'express';
import resetPassword from '../controllers/resetPassword.js';
const router =express.Router();



router.post('/reset-password/:userID/:resetToken', resetPassword);

export default router;