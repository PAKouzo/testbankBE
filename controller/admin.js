import QuestionModel from "../model/question";
import TestModel from "../model/tests";
import UserModel from "../model/users";

const AdminCTL = {
  getUserById: async (req, res) => {
    try {
      const { _id } = req.query;
      const users = await UserModel.findById(_id);
      if (!_id) throw new Error("Invalid id");
      res.json(users);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  getListUser: async (req, res) => {
    try {
      const { role } = req.query;
      const users = await UserModel.find({ role });
      if (role !== "Student" && role !== "Teacher")
        throw new Error("Invalid role");
      res.json(users);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { _id } = req.query;
      const tests = await TestModel.findByIdAndDelete(_id);
      if (!_id) throw new Error("Invalid id");
      res.status(401).json({
        message: "User deleted successfully",
        data: tests,
      });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  getUserByUsername: async (res, req) => {
    const { fullname } = req.query;
    const users = await UserModel.find({ $text: { $search: fullname } });
    res.status(200).send({
      message: "Finding successfully",
      data: users,
    });
  },
  //get list exams
  getListTestById: async (req, res) => {
    try {
      const { _id } = req.query;
      const tests = await TestModel.findById(_id);
      if (!_id) throw new Error("Invalid id");
      res.json(tests);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  getListTestByTitle: async (req, res) => {
    const { title } = req.query;
    const users = await TestModel.find({ $text: { $search: title } });
    res.status(200).send({
      message: "Finding successfully",
      data: users,
    });
  },
  //questions
  getQuestionByType: async (req, res) => {
    const { type } = req.query;
    const questions = await QuestionModel.find({ type });
    res.status(200).send({
      message: "Finding successfully",
      data: questions,
    });
  },
  getQuestionByContent: async(req, res)=>{
    const {content} = req.query;
    const questions = await QuestionModel.find({$text: {$search: content}});
    res.status(200).send({
      message: "Find successfully",
      data: questions
    })
  }
};
export default AdminCTL;