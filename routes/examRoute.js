import express from 'express';
import {
  createExam,
  deleteExam,
  getAllExam,
  getSingleExam,
  submitExam,
  updateExam,
} from '../controllers/examController.js';
import { checkExam } from '../middleware/examMiddleware.js';
import { isAdmin, isTeacher, requireSignIn } from '../middleware/authMiddleware.js';

const router = express.Router();

//create exam admin
router.post('/admin/create-exam', requireSignIn, isAdmin, checkExam, createExam);

//create exam teacher
router.post('/teacher/create-exam', requireSignIn, isTeacher, checkExam, createExam);

//get all
router.get('/get-all', getAllExam);

//get all exam for user
// router.get('/get-all-exam-for-user', requireSignIn, getSingleExamUser);

//get single exam for admin
router.get('/get-single-exam/:_id', getSingleExam);

//update exam admin
router.put('/admin/update-exam/:id', requireSignIn, isAdmin, updateExam);

//update exam teacher
router.put('/teacher/update-exam/:id', requireSignIn, isTeacher, updateExam);

//delete exam admin
router.delete('/admin/delete-exam/:id', requireSignIn, isAdmin, deleteExam);

//delete exam teacher
router.delete('/teacher/delete-exam/:id', requireSignIn, isTeacher, deleteExam);

//submit exam
router.post('/submit-exam/:_id', requireSignIn, submitExam);

export default router;
