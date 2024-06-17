import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true
    },
    level: {
        type: String,
        default: "easy",
    },
    answers: [{
        text: {
            type: String,
            required: true
        },
        isCorrect: {
            type: Boolean,
            default: false,
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const QuestionModel = mongoose.model('Question', QuestionSchema);

export default QuestionModel;