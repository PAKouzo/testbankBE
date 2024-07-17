import { error } from 'console';
import questionModel from '../models/questionModel.js';
import fs from 'fs';
import slug from 'slug';
import slugify from 'slugify';

export const createQuestionController = async (req, res) => {
  try {
    const { subject, course, topic, difficulty, type, content, answers, correctAnswer, solution } =
      req.fields;

    switch (true) {
      case !subject:
        return res.status(500).send({ error: 'Subject is required' });
      case !course:
        return res.status(500).send({ error: 'Course is required' });
      case !topic:
        return res.status(500).send({ error: 'Topic is required' });
      case !difficulty:
        return res.status(500).send({ error: 'Difficulty is required' });
      case !type:
        return res.status(500).send({ error: 'Type is required' });
      case !content:
        return res.status(500).send({ error: 'Content is required' });
      case !answers:
        return res.status(500).send({ error: 'Answers is required' });
      case !correctAnswer:
        return res.status(500).send({ error: 'Correct Answer is required' });
      case !solution:
        return res.status(500).send({ error: 'Solution is required' });
    }
    const questions = new questionModel({ ...req.fields, slug: slugify(subject) });

    await questions.save();

    res.status(201).send({
      success: true,
      message: 'Question created successfully',
      data: questions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in creating question',
      error,
    });
  }
};

//update question
export const updateQuestionController = async (req, res) => {
  try {
    const { subject, course, topic, difficulty, type, content, answers, correctAnswer, solution } =
      req.fields;

    switch (true) {
      case !subject:
        return res.status(500).send({ error: 'Subject is required' });
      case !course:
        return res.status(500).send({ error: 'Course Level is required' });
      case !topic:
        return res.status(500).send({ error: 'Topic is required' });
      case !difficulty:
        return res.status(500).send({ error: 'Difficulty is required' });
      case !type:
        return res.status(500).send({ error: 'Type is required' });
      case !content:
        return res.status(500).send({ error: 'Content is required' });
      case !answers:
        return res.status(500).send({ error: 'Answers is required' });
      case !correctAnswer:
        return res.status(500).send({ error: 'Correct Answer is required' });
      case !solution:
        return res.status(500).send({ error: 'Solution is required' });
    }

    const questions = await questionModel.findByIdAndUpdate(
      req.params.qid,
      { ...req.fields, slug: slugify(subject) },
      { new: true },
    );
    await questions.save();
    res.status(201).send({
      success: true,
      message: 'Question updated successfully',
      questions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in updating question',
      error,
    });
  }
};

//delete question
export const deleteQuestionController = async (req, res) => {
  try {
    await questionModel.findByIdAndDelete(req.params.qid);
    res.status(200).send({
      success: true,
      message: 'Question deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in deleting question',
      error,
    });
  }
};

export const shareQuestionController = async (req, res) => {
  try {
    const { usersToShare } = req.body;
    const url = `${process.env.CLIENT_URL}/share/${req.params.slug}`;

    // Share the question with the specified users
    await shareQuestionWithUsers(req.params.slug, usersToShare);

    res.status(200).send(url);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in sharing question',
      error,
    });
  }
};

// const shareQuestionWithUsers = async (slug, usersToShare) => {
//     const url = `${process.env.CLIENT_URL}/share/${slug}`;
//     const users = await userModel.find({ _id: { $in: usersToShare } });
//     if (users.length > 0) {
//         users.forEach(async (user) => {
//             const notification = new notificationModel({
//                 user: user._id,
//                 message: `Someone shared a question with you: ${url}`,
//                 url
//             });
//             await notification.save();
//         });
//     }
// }

//duplicate question
export const duplicateQuestionController = async (req, res) => {
  try {
    const question = await questionModel.findById(slugify(req.params.slug));
    if (!question) {
      return res.status(404).send({ error: 'Question not found' });
    }
    const newQuestion = new questionModel({
      subject: question.subject,
      slug: question.slug,
      course: question.course,
      topic: question.topic,
      difficulty: question.difficulty,
      type: question.type,
      content: question.content,
      answers: question.answers,
      correctAnswer: question.correctAnswer,
      solution: question.solution,
    });
    await newQuestion.save();
    res.status(201).send({
      success: true,
      message: 'Question duplicated successfully',
      newQuestion,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in duplicating question',
      error,
    });
  }
};

//get all questions
export const getQuestionController = async (req, res) => {
  try {
    const questions = await questionModel.find().populate('course');
    res.status(200).send({
      success: true,
      questions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in getting questions',
      error,
    });
  }
};

//get detail of question
export const getSingleQuestionController = async (req, res) => {
  try {
    const question = await questionModel.findOne({ slug: req.params.slug }).populate('course');
    res.status(200).send({
      success: true,
      message: 'Single Question Fetched',
      question,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in getting single question',
      error,
    });
  }
};
