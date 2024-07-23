import express from 'express';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
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

//create question
router.post('/create-question', requireSignIn, isAdmin, formidable(), createQuestionController);

//update question
router.put('/update-question/:qid', requireSignIn, isAdmin, formidable(), updateQuestionController);

//delete question
router.delete('/delete-question/:qid', requireSignIn, isAdmin, deleteQuestionController);

//get all questions
router.get('/get-questions', getQuestionController);

//shared question
// router.get('/shared-question', requireSignIn, isAdmin, shareQuestionController);

//duplicate question
router.post('/duplicate-question/:slug', requireSignIn, isAdmin, duplicateQuestionController);

//get details of a single question
router.get('/get-question/:_id', getSingleQuestionController);

export default router;
