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
        ref:'Assignment'
    },
    content:Buffer,
    grade:Number,
    comments:[String]

    
})

export const modelSubmission = mongoose.model('Submissions',submissionSchema)