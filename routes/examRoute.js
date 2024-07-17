import express from 'express';
import { createExam, getAllExam } from '../controllers/examController.js';
import { checkExam } from '../middleware/examMiddleware.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';

const router = express.Router();

//create exam
router.post('/create-exam', requireSignIn, isAdmin, checkExam, createExam);

//get all
router.get('/get-all', requireSignIn, isAdmin, getAllExam);

//get single exam
export default router;
