import express from 'express';
import {
    getCourseinfoData,
    updateCourseinfoData,
    deleteCourseinfoData,
} from '../controllers/courseinfo.js';

const router = express.Router();


router.get('/getcourseinfoData/:type', getCourseinfoData);


router.put('/courseinfo/:id', updateCourseinfoData);


router.delete('/courseinfo/:id', deleteCourseinfoData);

export default router;
