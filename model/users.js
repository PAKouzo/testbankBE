import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ["Admin", "Teacher", "Student"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  age: {
    type: Number,
    min: 0,
  },
  DateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  organization: {
    type: String,
  },
  access_token: {
    type: String,
    require: true,
  },
  refresh_token: {
    type: String,
    require: true,
  },
});
const UserModel = mongoose.model('users', userSchema)
export default UserModel;