import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.ObjectId,
      ref: 'courses',
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
      enum: ['Choice', 'Multi-choice', 'Text-input'],
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    answers: {
      type: [String],
      trim: true,
      required: true,
    },
    correctAnswer: {
      type: String,
      trim: true,
      required: true,
    },
    solution: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('questions', questionSchema);
