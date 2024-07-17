import slugify from 'slugify';
import examModel from '../models/examModel.js';

export const createExam = async (req, res) => {
  const {
    name,
    time,
    point,
    accessTime,
    timeStart,
    timeEnd,
    correctChoice,
    decription,
    accessPassword,
    subject,
    course,
    question,
  } = req.body;
  const exam = await examModel.create({
    name,
    time,
    point,
    accessTime,
    timeStart,
    timeEnd,
    correctChoice,
    decription,
    accessPassword,
    subject,
    course,
    question,
    slug: slugify(name),
  });
  res.status(201).send({
    message: 'Creating exam is successful',
    data: exam,
  });
};

// get all
export const getAllExam = async (req, res) => {
  try {
    const exams = await examModel.find().populate('course').populate('subject');
    res.status(200).send({
      success: true,
      exams,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in getting exams',
      error,
    });
  }
};
