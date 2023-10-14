import { modelChat } from '../Model/ChatsModel'
import { modelUser } from '../Model/UserModel';
import express from 'express'
import mongoose from 'mongoose';
import { connect } from '../Mongo/MongoConfig';
const ChatsRouter = express.Router();

ChatsRouter.get('/username/:username',async (request,response)=>{
    const userParam = request.params.username
    await connect()
    const user = await modelUser.find({username:userParam})
    await modelChat.find({user:user}).populate({path:'user other',select:'username'}).then(async chat => {
      return response.json(chat)
    })
    .catch(async error =>{
        console.log(error)
        response.status(400).json({ error: 'content missing' })
    });
    await mongoose.connection.close()
  })
  
  ChatsRouter.delete('/username/:username/other/:other', async(request,response)=>{
    const params = request.params
    const user = params.username
    const other = params.other
    await connect()
    await modelChat.findOneAndDelete({user:user,other:other}).catch(_err => {
      return response.status(404)
    })
    await mongoose.connection.close()
  })
  
  
  ChatsRouter.post('/',async (request,response)=>{
      const body = request.body
      if (!body.username || !body.other) {
          response.status(400).json({ error: 'content missing' })
      }else{
        try{
            await connect()
            const author = await modelUser.findOne({username:body.username})
            const other = await modelUser.findOne({username:body.other})
            const newChat = new modelChat({
                user:author,
                other:other
            })
            await newChat.save().then(async chat => {
                  response.json(chat)
                }).catch(async error =>{
                  console.log(error)
                  response.status(400).json({ error: 'content missing' })
                });
        }
        catch(e){
          return response.status(404).json({error: 'Requested resource could not be found.'})
        }
          await mongoose.connection.close()
      }
  })
  

  export default ChatsRouter
