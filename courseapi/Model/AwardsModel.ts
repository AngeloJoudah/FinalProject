import mongoose from "mongoose";

const awardsSchema = new mongoose.Schema({
    message:String,
    title:String,
    to:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true       
    },
    sticker:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Complements',
        required: false
    },
    time:String,
    read:{
        type:Boolean,
        required:true,
        default:false
    }

})

export const modelAwards = mongoose.model('Awards', awardsSchema);