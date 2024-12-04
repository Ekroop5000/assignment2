import express from 'express';
const router = express.Router();
import { getAllStudents, getStudentById } from '../controllers/studentController.js';

router.get('/', getAllStudents);
router.get('/:id', getStudentById);

export default router;