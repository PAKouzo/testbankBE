import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

export default mongoose.model('Course', courseSchema);
