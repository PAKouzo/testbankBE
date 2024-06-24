import mongoose from "mongoose";
const classSchema = new mongoose.Schema({
    className: {
        type: String,
        required: true
    }
})
const ClassModel = mongoose.model("classes", classSchema)
export default ClassModel;