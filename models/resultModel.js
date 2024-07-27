import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.ObjectId,
      ref: 'users',
      required: true,
    },
    examId: {
      type: mongoose.ObjectId,
      ref: 'Exam',
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Result', resultSchema);
