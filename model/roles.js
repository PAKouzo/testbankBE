import mongoose from "mongoose";
const roleSchema = new mongoose.Schema({
    roleName: String
})
const RoleModel = mongoose.model("role", roleSchema);
export default RoleModel;