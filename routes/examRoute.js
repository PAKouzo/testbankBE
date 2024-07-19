import express from 'express';
import {
  createExam,
  deleteExam,
  getAllExam,
  getSingleExam,
  updateExam,
} from '../controllers/examController.js';
import { checkExam } from '../middleware/examMiddleware.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';

const router = express.Router();

//create exam
router.post('/create-exam', requireSignIn, isAdmin, checkExam, createExam);

//get all
router.get('/get-all', getAllExam);

//get all exam for user
// router.get('/get-all-exam-for-user', requireSignIn, getSingleExamUser);

//get single exam
router.get('/get-single-exam/:id', getSingleExam);

//update exam
router.put('/update-exam/:id', requireSignIn, isAdmin, checkExam, updateExam);

//delete exam
router.delete('/delete-exam/:id', requireSignIn, isAdmin, deleteExam);
export default router;
