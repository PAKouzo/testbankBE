import TestModel from "../model/tests";
import UserModel from "../model/users";

const AdminCTL = {
    getUserById:async(req, res) => {
        try{
            const{_id} = req.body;
            const users = await UserModel.findById(_id)
            if (!_id)
              throw new Error("Invalid id");
            res.json(users);
        }
        catch(e){
            res.status(500).json({message: e.message})
        }
    },
    getListUser: async(req, res) => {
        try {
          const { role } = req.query;
          const users = await UserModel.find({ role });
          if (role !== "Student" && role !== "Teacher") throw new Error('Invalid role')
          res.json(users);
        } catch(e){
          res.status(500).json({ message: e.message });
        }
    },
    getListTestById: async(req, res) => {
        try {
          const { _id } = req.body;
          const tests = await TestModel.findById(_id);
          if (!_id) throw new Error("Invalid id");
          res.json(tests);
        } catch (e) {
          res.status(500).json({ message: e.message });
        }
    }
}
export default AdminCTL;