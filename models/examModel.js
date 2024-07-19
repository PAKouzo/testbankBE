import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  point: {
    type: Number,
    required: true,
  },
  accessTime: {
    type: Number,
    required: true,
  },
  timeStart: {
    type: Date,
    default: Date.now,
    required: true,
  },
  timeEnd: {
    type: Date,
    required: true,
  },
  correctChoice: {
    type: Number,
    required: true,
  },
  decription: {
    type: String,
    required: true,
  },
  accessPassword: {
    type: String,
    required: true,
  },
  subject: {
    type: mongoose.ObjectId,
    ref: 'Subject',
    required: true,
  },
  course: {
    type: mongoose.ObjectId,
    ref: 'Course',
    required: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  question: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    },
  ],
});

export default mongoose.model('Exam', examSchema);
