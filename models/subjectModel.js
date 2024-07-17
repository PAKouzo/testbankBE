import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});
export default mongoose.model('Subject', subjectSchema);
