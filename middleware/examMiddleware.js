export const checkExam = async (req, res, next) => {
  try {
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
    if (!name) throw new Error('Name of exam is required!');
    if (!time) throw new Error('Time of exam is required!');
    if (!point) throw new Error('Point of exam is required!');
    if (!accessTime) throw new Error('accessTime of exam is required!');
    if (!timeStart) throw new Error('timeStart of exam is required!');
    if (!timeEnd) throw new Error('timeEnd of exam is required!');
    if (!correctChoice) throw new Error('correctChoice of exam is required!');
    if (!decription) throw new Error('decription of exam is required!');
    if (!accessPassword) throw new Error('accessPassword of exam is required!');
    if (!subject) throw new Error('subject of exam is required!');
    if (!course) throw new Error('course of exam is required!');
    if (!question) throw new Error('question of exam is required!');
    next();
  } catch (e) {
    res.status(402).send({
      message: e.message,
      data: null,
      success: false,
    });
  }
};
