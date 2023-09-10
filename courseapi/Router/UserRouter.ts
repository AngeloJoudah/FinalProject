import { modelUser } from '../Model/UserModel'
import express from 'express'
import mongoose from 'mongoose';
import { connect } from '../Mongo/MongoConfig';

const UserRouter = express.Router();

UserRouter.post('/',async (request,response) =>{
    const body = request.body
    await connect()
    console.log(body)
    if(!body.username && !body.firstName && !body.lastName){ 
        response.status(404).json('Invalid Request Body')
    }
    else{
        const newUser = new modelUser({
            firstName:body.firstName,
            lastName:body.lastName,
            username:body.username,
            courses:body.courses
        })
        await newUser.save().then(async user => {
            response.json(user)
          }).catch(async error =>{
            console.log(error)
            response.status(400).json({ error:error })
          });
    } 
    await mongoose.connection.close()
})

UserRouter.get('/:username',async(request,response)=>{
    const username = request.params.username
    await connect()
    const user = modelUser.findOne({username:username})
    response.json(user)
    await mongoose.connection.close()
})


UserRouter.get('/',async(_request,response)=>{
    try{
        await connect()
        await modelUser.find().then(async users=>{
            return response.json(users)
        })
    }catch{
        response.status(500)
    }
    await mongoose.connection.close()
})


export default UserRouter


