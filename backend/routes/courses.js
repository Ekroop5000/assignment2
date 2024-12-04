import express from 'express';
import { getAllCourses, addCourse } from '../controllers/courseController.js';

const router = express.Router();

router.get('/', getAllCourses);
router.post('/', addCourse);

export default router;