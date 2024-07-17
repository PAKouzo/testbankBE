import express from 'express';
import { createExam, getAllExam } from '../controllers/examController.js';
import { checkExam } from '../middleware/examMiddleware.js';
import formidable from 'express-formidable';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-exam', requireSignIn, isAdmin, checkExam, createExam);
router.get('/get-all', requireSignIn, isAdmin, getAllExam)
export default router;
