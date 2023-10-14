import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    username:String,
    courses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    chats:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chats'
    }]
})

export const modelUser =  mongoose.model('User',userSchema)