import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    image: String,
    name: String,
    description: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    roster: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    },
    enrolling:{
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
    },
    assignments:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignments'}],
    code:{
        type:String,
        required: true,
        unique:true
    }
})


export const modelCourse = mongoose.model('Course', courseSchema);
