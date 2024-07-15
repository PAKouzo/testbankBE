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
      gradeLevel,
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
      gradeLevel,
      question,
      slug: slugify(name),
    });
    res.status(201).send({
      message: 'Creating exam is successful',
      data: exam,
    });
};
