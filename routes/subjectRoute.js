import express from 'express';
import {
  createSubjectController,
  deleteSubjectController,
  getSingleSubjectController,
  subjectController,
  updateSubjectController,
} from '../controllers/subjectController.js';
import { isAdmin, isTeacher, requireSignIn } from '../middleware/authMiddleware.js';

const router = express.Router();

//routes admin
router.post('/admin/create-subject', requireSignIn, isAdmin, createSubjectController);

//routes teacher
router.post('/teacher/create-subject', requireSignIn, isTeacher, createSubjectController);

//get all subjects admin
router.get('/admin/subjects', requireSignIn, isAdmin, subjectController);

//get all subjects teacher
router.get('/teacher/subjects', requireSignIn, isTeacher, subjectController);

//get single subject admin
router.get('/admin/subject/:slug', requireSignIn, isAdmin, getSingleSubjectController);

//get single subject teacher
router.get('/teacher/subject/:slug', requireSignIn, isTeacher, getSingleSubjectController);

//update admin
router.put('/admin/update-subject/:id', requireSignIn, isAdmin, updateSubjectController);

//update teacher
router.put('/teacher/update-subject/:id', requireSignIn, isTeacher, updateSubjectController);

//delete admin
router.delete('/admin/delete-subject/:id', requireSignIn, isAdmin, deleteSubjectController);

//delete teacher
router.delete('/teacher/delete-subject/:id', requireSignIn, isTeacher, deleteSubjectController);

export default router;
