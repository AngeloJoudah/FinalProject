import mongoose from "mongoose";

const gradebookSchema = new mongoose.Schema({
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    },
    student: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    submissions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Submissions'    
    }],
    grades:[Number],
    gpa:Number,
    letterGrade:String

})

export const modelAssignment = mongoose.model('Grades',gradebookSchema)