import mongoose from "mongoose";

const StudentAnswerSchema = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  selected_option_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question.options",
    required: false,
  },
  answer_text: { type: String, required: false },
  is_correct: { type: Boolean, required: true },
});

const StudentTestSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  test_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: true,
  },
  score: { type: Number, required: true },
  completed_at: { type: Date, default: Date.now },
  answers: [StudentAnswerSchema],
});

const StudentTestModel = mongoose.model("StudentTest", StudentTestSchema);

export default StudentTestModel;
