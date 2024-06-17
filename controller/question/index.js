import QuestionModel from "../../models/question";

const QuestionCTL = {
    createQuestion: async (req, res) => {
        const { subject, topic, level, answers } = req.body;

        const createdQuestion = await QuestionModel.create({
            subject: subject,
            topic: topic,
            level: level,
            answers: answers,
        });

        res.status(201).send({
            messase: "Create question successfull",
            data: createdQuestion,
        });
    },

    questionListBySubject: async (req, res) => {
        const { subject } = req.query;

        const questionList = await QuestionModel.find({ subject: { $regex: new RegExp(subject, 'i') } });

        res.status(200).send({
            messase: "search questions by subject success",
            data: questionList,
        })
    },

    updateQuestion: async (req, res) => {
        const questId = req.params;
        const { subject, topic, level, answers } = req.body;

        const updatedQuestion = await QuestionModel.findByIdAndUpdate(questId, {
            subject: subject,
            topic: topic,
            level: level,
            answers: answers,
        });

        await updatedQuestion.save();
        res.status(201).send({
            message: "Update question success",
            data: updatedQuestion,
        });
    },

    deleteQuestion: async (req, res) => {
        const questId = req.params;

        await QuestionModel.findByIdAndDelete(questId);
        res.status(200).send({
            message: "Delete question success",
        })
    },


};

export default QuestionCTL;