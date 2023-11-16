import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    username:String,
    profilePicture:String,
    courses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    chats:[{
        user:String,
        other:String
    }],
    userType:{
        type:String,
        enum: ['Instructor','Student'],
        required:true
    }
})
userSchema.index({username: 1},{unique:true})
export const modelUser =  mongoose.model('User',userSchema)