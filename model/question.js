import mongoose from "mongoose";

const OptionSchema = new mongoose.Schema({
  content: { type: String, required: true },
  is_correct: { type: Boolean, required: true },
});

const questionSchema = new mongoose.Schema({
  content: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    enum: ["multiple_choice", "true_false", "short_answer"],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  subject_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subjects",
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  options: [OptionSchema],
});
const QuestionModel = mongoose.model("questions", questionSchema)
export default QuestionModel;