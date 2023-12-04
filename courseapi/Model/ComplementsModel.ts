import mongoose from "mongoose";

const complementsSchema = new mongoose.Schema({
    file:String,
    fileType:String,
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: false
    },
    original: {
        type: Boolean,
        default: false,
        required: true
    }
})

export const modelComplements = mongoose.model('Complements', complementsSchema);