import { error } from 'console';
import questionModel from '../models/questionModel.js';
import fs from 'fs';
import slug from 'slug';
import slugify from 'slugify';
import { start } from 'repl';

//create question
export const createQuestionController = async (req, res) => {
  try {
    const {
      subject,
      course,
      topic,
      difficulty,
      type,
      content,
      answer,
      answer1,
      answer2,
      answer3,
      answer4,
      correctAnswer,
      correctAnswer1,
      solution,
    } = req.fields;

    // Validate required fields
    if (!subject) return res.status(400).send({ error: 'Subject is required' });
    if (!course) return res.status(400).send({ error: 'Course is required' });
    if (!topic) return res.status(400).send({ error: 'Topic is required' });
    if (!difficulty) return res.status(400).send({ error: 'Difficulty is required' });
    if (!type) return res.status(400).send({ error: 'Type is required' });
    if (!content) return res.status(400).send({ error: 'Content is required' });
    if (!solution) return res.status(400).send({ error: 'Solution is required' });

    if (type === 'Text-Input') {
      if (!correctAnswer) {
        return res.status(400).send({ error: 'Correct Answer is required for text input type' });
      }
    } else if (type === 'Multi-Choice') {
      const requiredAnswers = [answer, answer1, answer2, answer3, answer4];
      if (requiredAnswers.some((ans) => ans === undefined)) {
        return res
          .status(400)
          .send({ error: 'All five answers are required for multiple-choice questions' });
      }
      const correctAnswers = [correctAnswer, correctAnswer1];
      if (
        correctAnswers.some((ans) => ans === undefined) ||
        correctAnswers[0] === correctAnswers[1] ||
        !correctAnswers.every((ans) => requiredAnswers.includes(ans))
      ) {
        return res
          .status(400)
          .send({ error: 'Correct answer must be two distinct answers from the provided options' });
      }
    } else if (type === 'Choice') {
      const requiredAnswers = [answer1, answer2, answer3, answer4];
      if (requiredAnswers.some((ans) => ans === undefined)) {
        return res
          .status(400)
          .send({ error: 'All four answers are required for choice questions' });
      }
      if (!correctAnswer || !requiredAnswers.includes(correctAnswer)) {
        return res
          .status(400)
          .send({ error: 'Correct answer must be one of the provided answers' });
      }
    } else {
      return res.status(400).send({ error: 'Invalid question type' });
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
      error: error.message,
    });
  }
};

//update question
export const updateQuestionController = async (req, res) => {
  try {
    const {
      subject,
      course,
      topic,
      difficulty,
      type,
      content,
      answer,
      answer1,
      answer2,
      answer3,
      answer4,
      correctAnswer,
      correctAnswer1,
      solution,
    } = req.fields;

    // Validate fields if they are provided
    if (
      !subject &&
      !course &&
      !topic &&
      !difficulty &&
      !type &&
      !content &&
      !solution &&
      !answer &&
      !answer1 &&
      !answer2 &&
      !answer3 &&
      !answer4 &&
      !correctAnswer &&
      !correctAnswer1 &&
      !solution
    ) {
      return res.status(400).send({ error: 'At least one field is required to update' });
    }

    // Validate input based on the type
    if (type === 'Text-Input') {
      if (correctAnswer !== undefined && !correctAnswer) {
        return res.status(400).send({ error: 'Correct Answer is required for text input type' });
      }
    } else if (type === 'Multi-Choice') {
      const requiredAnswers = [answer, answer1, answer2, answer3, answer4];
      if (requiredAnswers.some((ans) => ans === undefined)) {
        return res
          .status(400)
          .send({ error: 'All five answers are required for multiple-choice questions' });
      }
      const correctAnswers = [correctAnswer, correctAnswer1];
      if (
        correctAnswers.some((ans) => ans === undefined) ||
        correctAnswers[0] === correctAnswers[1] ||
        !correctAnswers.every((ans) => requiredAnswers.includes(ans))
      ) {
        return res
          .status(400)
          .send({ error: 'Correct answer must be two distinct answers from the provided options' });
      }
    } else if (type === 'Choice') {
      const requiredAnswers = [answer1, answer2, answer3, answer4];
      if (requiredAnswers.some((ans) => ans === undefined)) {
        return res
          .status(400)
          .send({ error: 'All four answers are required for choice questions' });
      }
      if (
        correctAnswer !== undefined &&
        (!correctAnswer || !requiredAnswers.includes(correctAnswer))
      ) {
        return res
          .status(400)
          .send({ error: 'Correct answer must be one of the provided answers' });
      }
    } else {
      return res.status(400).send({ error: 'Invalid question type' });
    }

    // Update the question fields
    const updatedQuestion = await questionModel.findByIdAndUpdate(
      req.params.qid,
      { ...req.fields, slug: slugify(subject), slug: slugify(course) },
      { new: true },
    );
    await updatedQuestion.save();

    res.status(200).send({
      success: true,
      message: 'Question updated successfully',
      data: updatedQuestion,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in updating question',
      error: error.message,
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

// export const shareQuestionController = async (req, res) => {
//   try {
//     const { usersToShare } = req.body;
//     const url = `${process.env.CLIENT_URL}/share/${req.params.slug}`;

//     // Share the question with the specified users
//     await shareQuestionWithUsers(req.params.slug, usersToShare);

//     res.status(200).send(url);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: 'Error in sharing question',
//       error,
//     });
//   }
// };

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
// export const duplicateQuestionController = async (req, res) => {
//   try {
//     const question = await questionModel.findById(slugify(req.params.slug));
//     if (!question) {
//       return res.status(404).send({ error: 'Question not found' });
//     }
//     const newQuestion = new questionModel({
//       subject: question.subject,
//       slug: slugify(question.slug),
//       course: question.course,
//       topic: question.topic,
//       difficulty: question.difficulty,
//       type: question.type,
//       content: question.content,
//       answer1: question.answer1,
//       answer2: question.answer2,
//       answer3: question.answer3,
//       answer4: question.answer4,
//       correctAnswer: question.correctAnswer,
//       solution: question.solution,
//     });
//     await newQuestion.save();
//     res.status(201).send({
//       success: true,
//       message: 'Question duplicated successfully',
//       newQuestion,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: 'Error in duplicating question',
//       error,
//     });
//   }
// };
export const duplicateQuestionController = async (req, res) => {
  try {
    // Find the existing question
    const existingQuestion = await questionModel.findById(slugify(req.params.slug));
    if (!existingQuestion) return res.status(404).send({ error: 'Question not found' });

    // Create a new question object with the same data
    const newQuestionData = {
      ...existingQuestion.toObject(),
      _id: undefined,
      slug: slugify(existingQuestion.subject + ' (copy)'),
    };

    // Create and save the new question
    const newQuestion = new questionModel(newQuestionData);
    await newQuestion.save();

    res.status(201).send({
      success: true,
      message: 'Question duplicated successfully',
      data: newQuestion,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in duplicating question',
      error: error.message,
    });
  }
};

//get all questions
export const getQuestionController = async (req, res) => {
  try {
    const questions = await questionModel.find().populate('course').populate('subject');
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
    const questionId = req.params._id;

    const question = await questionModel
      .findById(questionId)
      .populate('course')
      .populate('subject');

    if (!question) {
      return res.status(404).send({
        success: false,
        message: 'Question not found',
      });
    }

    res.status(200).send({
      success: true,
      message: 'Single Question Fetched Successfully',
      question,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in getting single question',
      error: error.message,
    });
  }
};
