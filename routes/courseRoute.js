import express from 'express';
import { requireSignIn, isAdmin, isTeacher } from '../middleware/authMiddleware.js';
import {
  courseController,
  createCourseController,
  deleteCourseController,
  singleCourseController,
  updateCourseController,
} from '../controllers/courseController.js';

const router = express.Router();

//route-admin
router.post('/admin/create-course', requireSignIn, isAdmin, createCourseController);

//route-teacher
router.post('/teacher/create-course', requireSignIn, isTeacher, createCourseController);

//update course admin
router.put('/admin/update-course/:id', requireSignIn, isAdmin, updateCourseController);

//update course teacher
router.put('/teacher/update-course/:id', requireSignIn, isTeacher, updateCourseController);

//get all courses admin
router.get('/admin/courses', requireSignIn, isAdmin, courseController);

//get all courses teacher
router.get('/teacher/courses', requireSignIn, isTeacher, courseController);

//get single course admin
router.get('/admin/course/:slug', requireSignIn, isAdmin, singleCourseController);

//get single course teacher
router.get('/teacher/course/:slug', requireSignIn, isTeacher, singleCourseController);

//delete course admin
router.delete('/admin/delete-course/:id', requireSignIn, isAdmin, deleteCourseController);

//delete course teacher
router.delete('/teacher/delete-course/:id', requireSignIn, isTeacher, deleteCourseController);

export default router;
