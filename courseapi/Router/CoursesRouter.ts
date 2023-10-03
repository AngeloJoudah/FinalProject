import { modelCourse } from '../Model/CourseModel'
import express from 'express'
import mongoose from 'mongoose';
import { connect } from '../Mongo/MongoConfig';
const CourseRouter = express.Router();

CourseRouter.get('/',async (_request,response)=>{
  await connect()
  await modelCourse.find().then(async courses => {
    return response.json(courses)
  })
  .catch(async error =>{
      console.log(error)
      response.status(400).json({ error: 'content missing' })
  });
  await mongoose.connection.close()
})

CourseRouter.delete('/:id', async(request,response)=>{
  const id = request.params.id
  await connect()
  await modelCourse.findByIdAndDelete(id).catch(error =>{
    console.log(error)
    response.status(400).json({ error: 'no such entry exists' })
  });
  await mongoose.connection.close()
})


CourseRouter.post('/',async (request,response)=>{
    const body = request.body
    console.log(body)
    if (body.name === undefined || body.description === undefined || body.author) {
        response.status(404).json({ error: 'content missing' })
    }else{
    const newCard = new modelCourse({
        name:body.name,
        description:body.description,
        image:body.image,
        author:body.author
    })
    await connect()
    await newCard.save().then(async course => {
          response.json(course)
        }).catch(async error =>{
          console.log(error)
          response.status(400).json({ error: 'content missing' })
        });
        await mongoose.connection.close()
      }
})

CourseRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  await connect()
  await modelCourse.findById(id).then(course => {
    response.json(course)
  }).catch(error =>{
    console.log(error)
    response.status(400).json({ error: 'content missing' })
  });
  console.log("id: "+ id)
  await mongoose.connection.close()
})

export default CourseRouter