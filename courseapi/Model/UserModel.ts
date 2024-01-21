import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    username:String,
    profilePicture:String,
    description:String,
    postgresId:Number,
    courses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    chats:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chats'
    }],
    userType:{
        type:String,
        enum: ['TEACHER','STUDENT'],
        required:true
    },
    complementsGiven:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Complements',
        required:false
    }],
    awardsGiven:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Awards',
        required:false
    }],
    complementsReceived:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Awards',
        required:false
    }],
    students:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        required:false
    },
    email:{
        type:String,
        required:true
    },
    submissions:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Submissions',
        required:false
    }
})
userSchema.index({username: 1},{unique:true})
export const modelUser =  mongoose.model('User',userSchema)