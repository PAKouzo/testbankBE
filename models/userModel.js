import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      require: true,
      trim: true,
    },
    username: {
      type: String,
      require: true,
      unique: true,
    },
    accounttype: {
      type: String,
      default: 'student',
      enum: ['student', 'teacher'],
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    answer: {
      type: String,
      require: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    avatar: {
      data: Buffer,
      contentType: String,
    },
    age: {
      type: Number,
      require: true,
    },
    dateofbirth: {
      type: Date,
      require: true,
    },
    gender: {
      type: String,
      default: 'male',
      enum: ['male', 'female', 'other'],
      require: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('users', userSchema);
