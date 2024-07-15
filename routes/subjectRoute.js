import express from 'express';
import { createSubjectController, getAllSubject } from '../controllers/subjectController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', requireSignIn, isAdmin, createSubjectController);
router.get('/subjects', requireSignIn, isAdmin, getAllSubject)
export default router;
