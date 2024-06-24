import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  testName: {
    type: String,
    required: true,
  },
  subjectID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subjects",
    required: true,
  },
  teacherID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  showCorrectAnswers: {
    type: Boolean,
    required: true,
  },
  description: String,
  accessPassword: String,
});

const TestModel = mongoose.model("tests", testSchema);
export default TestModel;
