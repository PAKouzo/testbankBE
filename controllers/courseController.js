import slugify from 'slugify';
import courseModel from '../models/courseModel.js';

//create course
export const createCourseController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: 'Name is required' });
    }
    const existingCourse = await courseModel.findOne({ name });
    if (existingCourse) {
      return res.status(200).send({
        success: true,
        message: 'Course already exists',
      });
    }
    const course = await new courseModel({ name, slug: slugify(name) }).save();
    res.status(201).send({
      success: true,
      message: 'New Course created successfully',
      course,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in course creation',
      error,
    });
  }
};

//update course
export const updateCourseController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const course = await courseModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true },
    );
    res.status(200).send({
      success: true,
      message: 'Course updated successfully',
      course,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while updating course',
      error,
    });
  }
};

//get all courses
export const courseController = async (req, res) => {
  try {
    const courses = await courseModel.find({});
    res.status(200).send({
      success: true,
      message: 'All courses fetched successfully',
      courses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while getting all courses',
      error,
    });
  }
};

//get single course
export const singleCourseController = async (req, res) => {
  try {
    const course = await courseModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: 'Course fetched successfully',
      course,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while getting single course',
      error,
    });
  }
};

//delete course
export const deleteCourseController = async (req, res) => {
  try {
    const { id } = req.params;
    await courseModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while deleting course',
      error,
    });
  }
};
