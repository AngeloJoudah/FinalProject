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

UserRouter.get('/id/:id/student/:studentId', async (request, response) => {
  const { id, studentId } = request.params;
  console.log(id, studentId);

  if (!id || !studentId) {
    return response.status(404).json({ error: "Invalid request body." });
  }

  try {
    const user = await modelUser.findById(id);

    if (user) {
      const foundStudent = user.students?.find(student => student._id.toString() === studentId);

      if (foundStudent) {
        response.status(200).json(foundStudent);
      } else {
        response.status(404).json('Student not found');
      }
    } else {
      response.status(404).json('User not found');
    }
  } catch (error) {
    console.error(error);
    response.status(500).json('Internal server error');
  }
});

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

UserRouter.get('/id/:id',async(request,response)=>{
  const id = request.params.id
  if(!id){
    return response.status(400).json({error:"Invalid request body."})
  }
  try{
    const user = await modelUser.findById(id)
    if(!user){
      return response.status(404).json({error:"User with id specified does not exist"})
    }
    response.status(200).json(user)
  }catch(error){
    console.log(error)
    response.status(500).json({error:"Internal server error."})
  }
})


UserRouter.put('/description',async(request,response)=>{
  const {_id, text} = request.body
  if(!_id || !text){
    return response.status(400).json({error:"Invalid request body."})
  }
  if(text.length > 400){
    return response.status(400).json({error:"Description is too long. Must be 400 characters or less."})
  }
  try{
    await modelUser.findOneAndUpdate(
      {
      _id:_id
      },
      {
        $set: {
          description: text
        }
      }
    )
    response.status(200).json({message:'Update successful.'})
  }catch(error){
    console.log(error)
    response.status(500).json({error:"Internal server error."})
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
  console.log(username)
  console.log("hi")
  if(!username){
    response.status(404).json({error:'missing user'});
  }else{
    try{
      const users = await modelUser.find({ username: { $regex: new RegExp(username,"i") } })
      if(users.length < 1){
        response.status(404).json({error:"no user found matching this username"});
      }else{
        const data = users.map(user => {return {username:user.username,profilePicture:user.profilePicture,_id:user._id,email:user.email}})
        response.status(200).json(data.slice(0,5))
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


