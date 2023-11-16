import { modelUser } from '../Model/UserModel'
import express from 'express'

const UserRouter = express.Router();


UserRouter.get('/:id/courses',async(request,response)=>{
  const id = request.params.id
  try{
    const user = await modelUser.findById(id).populate({path:'courses',populate:[{path:'author',select:'username'},{path:'roster',select:'username'}]}).select('username')
    user ? response.status(200).json(user) : response.status(404).json('User not found')
  }catch{
    response.status(500).json('Internal server error')
  }
})

UserRouter.post('/',async (request,response) =>{
    const body = request.body
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
})

UserRouter.post('/image', async (request, response) => {
  const { username, profilePicture } = request.body;
  if (!username || !profilePicture) {
    return response.status(400).json({ error: "Invalid request body" });
  }

  try {
    await modelUser.findOneAndUpdate({ username: username }, { $set: { profilePicture: profilePicture } });
    response.status(200).json({ message: 'Image updated' });
  } catch (error) {
    console.error('Error:', error);
    response.status(500).json({ message: 'Internal Server Error' });
  }
});

UserRouter.get('/username/:username', async (request, response) => {
    const username = request.params.username;
    // Wrap the code in a try-catch block to handle potential errors
    try {
      const user = await modelUser.findOne({ username: username }).populate('courses');
  
      // Check if the user was found
      if (user) {
        // Send a JSON response with the user data
        response.json(user);
      } else {
        // If the user wasn't found, send a 404 status code
        response.status(404).json({ message: 'User not found' });
      }
  
      // Close the mongoose connection
    } catch (error) {
      // Handle any errors that occur during the process
      console.error('Error:', error);
      response.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
UserRouter.get('/search/:username',async(request,response)=>{
  const username = request.params.username
  if(!username){
    response.status(404);
  }else{
    try{
      const users = await modelUser.find({ username: { $regex: new RegExp(username,"i") } })
      if(users.length < 0){
        response.status(404).json({error:"no user found matching this username"});
      }else{
        response.status(200).json(users)
      }

    }
    catch (error) {
      console.error('Error:', error);
      response.status(500).json({ message: 'Internal Server Error' });
    }
  }
})

UserRouter.get('/',async(_request,response)=>{
    try{
        await modelUser.find().populate('courses','').then(async users=>{
            return response.json(users)
        })
    }catch{
        response.status(500)
    }
})


export default UserRouter


