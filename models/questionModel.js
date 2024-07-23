import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    subject: {
      type: mongoose.ObjectId,
      ref: 'Subject',
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.ObjectId,
      ref: 'Course',
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Identification', 'Understanding', 'Applying'],
      required: true,
    },
    type: {
      type: String,
      enum: ['Choice', 'Multi-Choice', 'Text-Input'],
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      trim: true,
    },
    answer1: {
      type: String,
      trim: true,
    },
    answer2: {
      type: String,
      trim: true,
    },
    answer3: {
      type: String,
      trim: true,
    },
    answer4: {
      type: String,
      trim: true,
    },
    correctAnswer: {
      type: String,
      trim: true,
      required: true,
    },
    correctAnswer1: {
      type: String,
      trim: true,
    },
    solution: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Question', questionSchema);
