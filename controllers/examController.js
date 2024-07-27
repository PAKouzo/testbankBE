import slugify from 'slugify';
import examModel from '../models/examModel.js';
import resultModel from '../models/resultModel.js';
import mongoose from 'mongoose';
import questionModel from '../models/questionModel.js';

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

// get all exams
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

//update exam
export const updateExam = async (req, res) => {
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
  const exam = await examModel.findByIdAndUpdate(
    req.params.id,
    {
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
    },
    { new: true },
  );
  res.status(200).send({
    success: true,
    message: 'Exam updated successfully',
    exam,
  });
};

// get single exam
export const getSingleExam = async (req, res) => {
  try {
    const examId = req.params._id;

    const exam = await examModel
      .findById(examId)
      .populate('course')
      .populate('subject')
      .populate('question');

    if (!exam) {
      return res.status(404).send({
        success: false,
        message: 'Exam not found',
      });
    }
    res.status(200).send({
      success: true,
      message: 'Single Exam Fetched',
      exam,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in getting single exam',
      error,
    });
  }
};

//delete exam
export const deleteExam = async (req, res) => {
  try {
    const exam = await examModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: 'Exam deleted successfully',
      exam,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in deleting exam',
      error,
    });
  }
};

//submit exam
export const submitExam = async (req, res) => {
  try {
    const examId = req.params._id;
    const userId = req.user._id;
    const answers = req.body.answers;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'Invalid User ID' });
    }

    if (!examId) {
      return res.status(400).json({ success: false, message: 'Invalid Exam ID' });
    }

    const exam = await examModel
      .findById(examId)
      .populate('course')
      .populate('subject')
      .populate('question');
    if (!exam) {
      return res.status(404).json({ success: false, message: 'Exam not found' });
    }

    let score = 0;

    exam.question.forEach((question) => {
      const userAnswer = answers[question._id];

      if (question.type === 'Text-Input') {
        if (userAnswer === question.correctAnswer) {
          score += 1;
        }
      } else if (question.type === 'Choice') {
        if (userAnswer === question.correctAnswer) {
          score += 1;
        }
      } else if (question.type === 'Multiple-Choice') {
        const correctAnswers = (question.correctAnswer && question.correctAnswer1) || [];
        const userAnswersArray = (userAnswer || []).sort();
        if (JSON.stringify(correctAnswers.sort()) === JSON.stringify(userAnswersArray)) {
          score += 1;
        }
      }

      console.log(userAnswer);
      console.log(question.correctAnswer);
    });

    // Save the result
    const result = new resultModel({
      userId: userId,
      examId: examId,
      score,
    });

    await result.save();
    res.json({ success: true, score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
