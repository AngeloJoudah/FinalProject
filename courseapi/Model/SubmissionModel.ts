import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User' 
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    },
    assignment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Assignments'
    },
    content:String,
    grade:Number,
    comments:String,
    submitted:String

    
})

export const modelSubmission = mongoose.model('Submissions',submissionSchema)