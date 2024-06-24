import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    subjectName: {
        type: String,
        require: true
    }
})
const SubjectModel = mongoose.model("subjects", subjectSchema)
export default SubjectModel;