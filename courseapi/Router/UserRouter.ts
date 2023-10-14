import { modelUser } from '../Model/UserModel'
import express from 'express'
import mongoose from 'mongoose';
import { connect } from '../Mongo/MongoConfig';

const UserRouter = express.Router();

UserRouter.post('/',async (request,response) =>{
    const body = request.body
    await connect()
    if(!body.username && !body.firstName && !body.lastName){ 
        response.status(404).json('Invalid Request Body')
    }
    else{
        const newUser = new modelUser({
            firstName:body.firstName,
            lastName:body.lastName,
            username:body.username,
            courses:body.courses,
            chats:body.chats
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

UserRouter.get('/username/:username', async (request, response) => {
    const username = request.params.username;
    // Wrap the code in a try-catch block to handle potential errors
    try {
      // Establish the mongoose connection
      await connect();
  
      // Use async/await to wait for the findOne operation to complete
      const user = await modelUser.findOne({ username: username });
  
      // Check if the user was found
      if (user) {
        // Send a JSON response with the user data
        response.json(user);
      } else {
        // If the user wasn't found, send a 404 status code
        response.status(404).json({ message: 'User not found' });
      }
  
      // Close the mongoose connection
      await mongoose.connection.close();
    } catch (error) {
      // Handle any errors that occur during the process
      console.error('Error:', error);
      response.status(500).json({ message: 'Internal Server Error' });
    }
  });
  


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


