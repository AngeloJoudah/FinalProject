import { modelCourse } from '../Model/CourseModel'
import { modelUser } from '../Model/UserModel';
import express from 'express'
import mongoose from 'mongoose';
import { cookieParser } from '../function/cookieParser';
const jwt = require('jsonwebtoken')
const CourseRouter = express.Router();

function generateRandomCode(length:number) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    code += charset[randomIndex];
  }
  return code;
}


CourseRouter.get('/:id', async (request, response) => {
  const courseId = request.params.id; // Access the ID from the URL parameters
  if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
    return response.status(404).json({ error: 'Course not found' }); 
  }
try{
  const course = await modelCourse
  .findOne({ _id: courseId }).populate('roster assignments').populate({path:'enrolling',select:'username profilePicture'})
  console.log(course)
    if(!course){
      return response.status(404).json({ error: 'Course not found' }); 
    }
    response.status(200).json(course)
  }
  catch(error){
    console.log(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});



CourseRouter.delete('/:id', async(request,response)=>{
  const id = request.params.id
  
  await modelCourse.findByIdAndDelete(id).catch(error =>{
    console.log(error)
    response.status(400).json({ error: 'no such entry exists' })
  });

})

CourseRouter.put('/enrolling/remove',async(request,response)=>{
  const userId = request.body.userId
  const courseId = request.body.courseId
  if(!userId || !courseId){
    return response.status(400).json({error:'Invalid request body.'})
  }
  try{
    const course = await modelCourse.findById(courseId)
    const enrollee = await modelCourse.findById(userId)
    if(!course && !enrollee){
      return response.status(404).json({error:'Course or Enrollee not found'})
    }
    const updated = await course?.updateOne({$pull:{enrolling:userId}},{new: true})
    updated ? 
    response.status(200).json({message:'Enrollee removed'}) :
    response.status(404).json({error:'User not enrolled in course.'})
  

  }catch(error){
    console.log(error)
    response.status(500).json({error:'Internal server error'})
  }
})

CourseRouter.put('/admit', async (request, response) => {
  const body = request.body;    
  const courseId = body.courseId
  const studentId = body.userId
  console.log(studentId,courseId)
  if(!courseId && !studentId){
    return response.status(400).json({message:'Request body invalid.'})
  }
  try {
    const newStudent = await modelUser.findById(studentId)
    const course = await modelCourse.findById(courseId)
    if(!newStudent && !course){
      return response.status(404).json({error:'Enrollee or course could not be found.'})
    }
    const updatedCourse = await course?.updateOne({ $addToSet: { roster: studentId }, $pull: {enrolling: studentId } }, { new: true });
    if (!updatedCourse) {
      // If no matching document was found, return a 404 response.
      return response.status(404).json("User not enrolled in course.");
    }
    const authorId = course?.author?._id
    await modelUser.findOneAndUpdate({_id:authorId},{$addToSet : {students: studentId}})
    await newStudent?.updateOne({$addToSet:{courses:course}})
    // Send a 200 response with the updated course
    response.status(200).json(updatedCourse);
  } catch (error) {
    // Log the error for debugging
    console.error('Error:', error);

    // Send a 500 response for internal server error
    response.status(500).json({error:"Internal server error"});
  }
});

CourseRouter.get('/get/code/:code',async(request,response)=>{
  const code = request.params.code
  if(!code){
    return response.status(400).json({error:'Code is missing'})
  }
  try{
    const course = await modelCourse.findOne({code:code}).select('author image name description').populate({path:'author',select:'username'})
    if(!course){
      return response.status(404).json({error:'Course could not be found.'})
    }
    response.status(200).json(course)
  }catch(err){
    console.log(err)
    response.status(500).json({error:'Internal Server Error'})
  }
})

CourseRouter.put('/enroll', async (request, response) => {
  const body = request.body;
  if(!request.headers.cookie){
    return response.status(401).json({error:'Missing access token.'})
  }
  let decodedToken;
  try{
    const parsedCookies = cookieParser(request.headers.cookie)
    const token = parsedCookies.token
    const options = {
      algorithms: ['HS256'],
    };
    const pk:String = process.env.SECRET_KEY || ''
    const privateKey = Buffer.from(pk, 'base64');
    decodedToken = await jwt.verify(token,privateKey,options)
    
  }catch(err){
    console.log(err)
    return response.status(401).json({error:'Invalid request token'})
  }
  try {
    const student = await modelUser.findById(body.id)
    if(student?.postgresId != decodedToken.pg_id || decodedToken.role != 'STUDENT'){
      return response.status(403).json({error:"You do not have the permission to perform this operation."})
    }
    const code = body.code
    const updatedCourse = await modelCourse.findOneAndUpdate({ code:code },{ $addToSet: { enrolling: student } }, { new: true });

    if (!updatedCourse) {
      // If no matching document was found, return a 404 response.
      return response.status(404).json("Course not found");
    }

    // Send a 200 response with the updated course
    response.status(200).json(updatedCourse);
  } catch (error) {
    // Log the error for debugging
    console.error('Error:', error);

    // Send a 500 response for internal server error
    response.status(500).json("Internal server error");
  }
});


CourseRouter.put('/', async (request, response) => {
  const body = request.body
  try {
    const courseId = request.body.id
    const updatedCourse = await modelCourse.findOneAndUpdate({ _id: courseId },{description:body.description,name:body.name,image:body.image}, { new: true });

    if (!updatedCourse) {
      // If no matching document was found, return a 404 response.
      return response.status(404).json("Course not found");
    }

    // Send a 200 response with the updated course
    response.status(200).json(updatedCourse);
  } catch (error) {
    // Log the error for debugging
    console.error('Error:', error);

    // Send a 500 response for internal server error
    response.status(500).json("Internal server error");
  }
});



CourseRouter.post('/', async (request, response) => {
  const body = request.body;

  try {
    // Validate the request data
    if (!body.name || !body.description || !body.author) {
      return response.status(400).json({ error: 'Required fields are missing' });
    }
    
    // Check if the user with the provided ID exists
    const user = await modelUser.findById(body.author);
    if (!user) {
      return response.status(400).json({ error: 'User not found' });
    }
    const newId = new mongoose.Types.ObjectId()
    // Create a new course
    const newCourse = new modelCourse({
      _id:newId,
      name: body.name,
      description: body.description,
      image: body.image,
      author: body.author,
      code: generateRandomCode(8)
    });
    // Save the course
    console.log(newCourse)
    await newCourse.save();
    await user.updateOne({ $push: {courses:newId}})
    // Close the MongoDB connection
   

    // Return the newly created course
    response.status(200).json(newCourse);
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error:', error);

    // Handle the error and send an informative response
    response.status(500).json('Internal server error');
  }
});

CourseRouter.put('/code', async (request, response) => {
  try {
    const courseId = request.body.id
    const updatedCourse = await modelCourse.findOneAndUpdate({ _id: courseId },{code:generateRandomCode(8)}, { new: true });

    if (!updatedCourse) {
      // If no matching document was found, return a 404 response.
      return response.status(404).json("Course not found");
    }

    // Send a 200 response with the updated course
    response.status(200).json(updatedCourse);
  } catch (error) {
    // Log the error for debugging
    console.error('Error:', error);

    // Send a 500 response for internal server error
    response.status(500).json("Internal server error");
  }
});

CourseRouter.get('/', async (_request, response) => {
  
  await modelCourse.find().populate('author roster').then(course => {
    response.json(course)
  }).catch(error =>{
    console.log(error)
    response.status(400).json({ error: 'content missing' })
  });

})

export default CourseRouter