import express from 'express';
import { isAdmin, isTeacher, requireSignIn } from '../middleware/authMiddleware.js';
import {
  createQuestionController,
  deleteQuestionController,
  duplicateQuestionController,
  getQuestionController,
  getSingleQuestionController,
  updateQuestionController,
} from '../controllers/questionController.js';
import formidable from 'express-formidable';

const router = express.Router();

//create question admin
router.post(
  '/admin/create-question',
  requireSignIn,
  isAdmin,
  formidable(),
  createQuestionController,
);

//create question teacher
router.post(
  '/teacher/create-question',
  requireSignIn,
  isTeacher,
  formidable(),
  createQuestionController,
);

//update question admin
router.put(
  '/admin/update-question/:qid',
  requireSignIn,
  isAdmin,
  formidable(),
  updateQuestionController,
);

//update question teacher
router.put(
  '/teacher/update-question/:qid',
  requireSignIn,
  isTeacher,
  formidable(),
  updateQuestionController,
);

//delete question admin
router.delete('/admin/delete-question/:qid', requireSignIn, isAdmin, deleteQuestionController);

//delete question teacher
router.delete('/teacher/delete-question/:qid', requireSignIn, isTeacher, deleteQuestionController);

//get all questions
router.get('/get-questions', getQuestionController);

//shared question
// router.get('/shared-question', requireSignIn, isAdmin, shareQuestionController);

//duplicate question admin
router.post('/admin/duplicate-question/:slug', requireSignIn, isAdmin, duplicateQuestionController);

//duplicate question teacher
router.post(
  '/teacher/duplicate-question/:slug',
  requireSignIn,
  isTeacher,
  duplicateQuestionController,
);

//get details of a single question
router.get('/get-question/:_id', getSingleQuestionController);

export default router;
