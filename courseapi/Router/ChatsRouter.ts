import mongoose from 'mongoose';
import { modelChat } from '../Model/ChatsModel';
import { modelUser } from '../Model/UserModel';
import express from 'express'
const ChatsRouter = express.Router();
 
ChatsRouter.post('/', async (request, response) => {
  const userId = request.body.userId;
  const otherId = request.body.otherId;
  if (!userId && !otherId) {
    return response.status(400).json({ error: 'Invalid request body' });
  }
  try {
    const user = await modelUser.findById(userId)
    const other = await modelUser.findById(otherId)
    if(!user && !other){
      return response.status(404).json({error:'One or more users could not be found.'})
    }
    const exists = await modelChat.findOne({
      $or: [
        { user1: userId , user2: otherId },
        { user1: otherId, user2: userId }
      ]
    });
    if(!exists){
      const newChat = new modelChat({user1:user,user2:other})
      await newChat.save()
      await user?.updateOne(
        { $addToSet: { chats: newChat } },
        {new:true}
      );
      await other?.updateOne(
        { $addToSet: { chats: newChat } },
        {new:true}
      );
      response.status(200).json(newChat);
  }
    else{
      response.status(200).json({message:'chat already exists'})
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

ChatsRouter.get('/user/:id', async(request,response)=>{
  try{
    const userId = request.params.id
    if(!userId){
      return response.status(404).json('Requested user could not be found.')
    }
    
    const user = await modelUser.findById(userId).populate({path:'chats',populate:{path:'user1 user2',model:'User'}})//.populate({path:'user1',select:'username'})
    if(!user){
      return response.status(404).json('User could not be found.')
    }
    response.status(200).json(user)
  } catch(error){
    console.error(error)
    response.status(500).json({ error: 'Internal Server Error'})
  }
})

ChatsRouter.get('/user/:id/chat/:chatId',async(request,response)=>{
  try{
    const userId = request.params.id
    const chatId = request.params.chatId
    
    if(!userId && !chatId){
      return response.status(400).json({error:'Invalid Request Body'})
    }
    const user = await modelUser.findById(userId)
    if(!user){
      return response.status(404).json({error:'user does not exist'})
    }
    const chat = user.chats.find(chat => chat === new mongoose.Types.ObjectId(chatId))
    chat ? response.status(200).json(chat) : response.status(404).json({error:'chat could not be found'})
  } catch(err){
    console.error(err)
    return response.status(500).json({ error: 'Internal Server Error'})
  }
})

ChatsRouter.delete('/user/:id/chat/:chatId',async (request,response)=>{
  try{
    const userId = request.params.id
    const chatId = request.params.chatId
    
    if(!userId && !chatId){
      return response.status(400).json({error:'Invalid Request Body'})
    }
    const user = await modelUser.findById(userId)
    if(!user){
      return response.status(404).json({error:'user does not exist'})
    }
    user.updateOne({$pull:{chats:chatId}},{new:true})
  } catch(err){
    console.error(err)
    return response.status(500).json({ error: 'Internal Server Error'})
  }
})

export default ChatsRouter
