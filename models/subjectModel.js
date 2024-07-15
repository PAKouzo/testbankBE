import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  slug: {
    type: String, 
    required: true,
  }
});
export default mongoose.model('subjects', subjectSchema);
