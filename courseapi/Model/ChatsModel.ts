import mongoose from "mongoose"

const chatsSchema = new mongoose.Schema({
    user1:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    user2:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

chatsSchema.index({ user1: 1, user2: 1 }, { unique: true });
export const modelChat = mongoose.model('Chats', chatsSchema)