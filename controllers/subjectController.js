import subjectModel from "../models/subjectModel.js";

export const createSubjectController = async (req, res) => {
  try{
    const { name } = req.body;
    if(!name) throw new Error("Name is required!")
    const subject = await subjectModel.create({
    name,
  });
  res.status(201).send({
    message: 'Creating grade is successful',
    data: subject,
  });
  }
  catch(e){
    res.status(500).send({
      message: e.message,
      data: null
    })
  }
};

export const getAllSubject = async (req, res) => {
  try {
    const subjects = await subjectModel.find({});
    res.status(200).send({
      success: true,
      message: 'All subjects fetched successfully',
      Data: subjects
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while getting all subjects',
      error,
    });
  }
}
