

import express from 'express';
import {getTEFCourseData, getTefCourseDate} from '../controllers/TEFCourse.js';

const router = express.Router();

router.get('/TEFCourse', getTEFCourseData);
router.get('/TEFCourse-date',getTefCourseDate)


export default router;