import mongoose from "mongoose"

const chatsSchema = new mongoose.Schema({

    other:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

export const modelChat = mongoose.model('Chats', chatsSchema)