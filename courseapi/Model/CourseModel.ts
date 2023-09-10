import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
    image:String,
    name:String,
    description:String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

export const modelCourse = mongoose.model('Course', courseSchema)
