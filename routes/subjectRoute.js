import express from 'express';
import {
  createSubjectController,
  deleteSubjectController,
  getSingleSubjectController,
  subjectController,
  updateSubjectController,
} from '../controllers/subjectController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';

const router = express.Router();

//routes
router.post('/create-subject', requireSignIn, isAdmin, createSubjectController);

//get all subjects
router.get('/subjects', requireSignIn, isAdmin, subjectController);

//get single subject
router.get('/subject/:slug', requireSignIn, isAdmin, getSingleSubjectController);

//update
router.put('/update-subject/:id', requireSignIn, isAdmin, updateSubjectController);

//delete
router.delete('/delete-subject/:id', requireSignIn, isAdmin, deleteSubjectController);

export default router;
