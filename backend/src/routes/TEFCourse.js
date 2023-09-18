

import express from 'express';
import {getTEFCourseData} from '../controllers/TEFCourse.js';

const router = express.Router();

router.get('/TEFCourse', getTEFCourseData);

export default router;