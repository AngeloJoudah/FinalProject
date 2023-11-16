import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    name:String,
    description:String,
    url:String,
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    assignees: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
})

export const modelAssignment = mongoose.model('Assignments',assignmentSchema)