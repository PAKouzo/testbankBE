import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        require: true,
        trim: true
    },
    username: {
        type:String,
        require: true,
        unique: true
    },
    accounttype: {
        type:String,
        default: 'student',
        enum: ['student', 'teacher'],
        require: true
    },
    email: {
        type:String,
        require: true,
        unique: true
    },
    password: {
        type:String,
        require: true,
    },
    answer: {
        type:String,
        require: true,
    },
    role: {
        type:Number,
        default:0,
    },
},
    {timestamps: true}
)

export default mongoose.model('users',userSchema)