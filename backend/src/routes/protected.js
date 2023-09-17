import express from 'express';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();


router.get('/protected', authenticateToken, (req, res) => {

  res.json({ message: 'Protected route', user: req.user });
});

export default router;
