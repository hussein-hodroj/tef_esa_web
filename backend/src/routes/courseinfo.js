import express from 'express';
import {
    getCourseinfoData,
    updateCourseinfoData,
    deleteCourseinfoData,
} from '../controllers/courseinfo.js';

const router = express.Router();


router.get('/courseinfo', getCourseinfoData);


router.put('/courseinfo/:id', updateCourseinfoData);


router.delete('/courseinfo/:id', deleteCourseinfoData);

export default router;
