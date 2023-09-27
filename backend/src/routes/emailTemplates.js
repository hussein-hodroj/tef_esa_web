import express from 'express';
import { getEmailTemplate, updateEmailTemplate } from '../controllers/emailTemplates.js';

const router = express.Router();

router.get('/emailtemplates', getEmailTemplate);
router.put('/emailtemplates/:id', updateEmailTemplate);

export default router;
