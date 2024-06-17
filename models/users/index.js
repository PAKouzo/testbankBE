import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
        require: true,
    },
    name: {
        type: String,
    },
    avatar: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    age: {
        type: Number,
        require: true,
    },
    gender: {
        type: String,
    },
    organization: {
        type: String,
    },
    role: {
        type: String,
        default: "student",
    },
    salt: {
        type: String,
    },
});

const UserModel = mongoose.model('users', userSchema);

export default UserModel;