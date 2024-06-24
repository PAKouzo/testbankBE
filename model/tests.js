import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  subject_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  questions: [TestQuestionSchema],
});

const TestModel = mongoose.model("tests", testSchema);
export default TestModel;
