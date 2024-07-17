import slugify from 'slugify';
import subjectModel from '../models/subjectModel.js';

export const createSubjectController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: 'Name is required' });
    }
    const existingSubject = await subjectModel.findOne({ name });
    if (existingSubject) {
      return res.status(200).send({
        success: true,
        message: 'Subject already exists',
      });
    }
    const subject = await new subjectModel({ name, slug: slugify(name) }).save();
    res.status(201).send({
      success: true,
      message: 'New subject created successfully',
      subject,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in subject creation',
      error,
    });
  }
};

export const getAllSubject = async (req, res) => {
  try {
    const subjects = await subjectModel.find({});
    res.status(200).send({
      success: true,
      message: 'All subjects fetched successfully',
      subjects,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while getting all subjects',
      error,
    });
  }
};

//update subject
export const updateSubjectController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const subject = await subjectModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true },
    );
    res.status(200).send({
      success: true,
      message: 'Subject updated successfully',
      subject,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while updating subject',
      error,
    });
  }
};

export const deleteSubjectController = async (req, res) => {
  try {
    const { id } = req.params;
    await subjectModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: 'Subject deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while deleting subject',
      error,
    });
  }
};
