import express from 'express';
import { createSubjectController, deleteSubjectController, getAllSubject, updateSubjectController } from '../controllers/subjectController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', requireSignIn, isAdmin, createSubjectController);
router.get('/subjects', requireSignIn, isAdmin, getAllSubject)
router.put('/update-subject/:id', requireSignIn, isAdmin, updateSubjectController);
router.delete('/delete-subject/:id', requireSignIn, isAdmin, deleteSubjectController);
export default router;
