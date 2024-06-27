import express from 'express';
import { requireSignIn, isAdmin } from '../middleware/authMiddleware.js';
import {
  courseController,
  createCourseController,
  deleteCourseController,
  singleCourseController,
  updateCourseController,
} from '../controllers/courseController.js';

const router = express.Router();

//route
router.post('/create-course', requireSignIn, isAdmin, createCourseController);

//update course
router.put('/update-course/:id', requireSignIn, isAdmin, updateCourseController);

//get all courses
router.get('/courses', requireSignIn, isAdmin, courseController);

//get single course
router.get('/course/:slug', requireSignIn, isAdmin, singleCourseController);

//delete course
router.delete('/delete-course/:id', requireSignIn, isAdmin, deleteCourseController);

export default router;
