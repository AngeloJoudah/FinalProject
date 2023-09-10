import { modelCourse } from "../Model/CourseModel";
import {connect} from '../Mongo/MongoConfig'

export const getAllCourseCards = async () =>{
    await connect()
    return modelCourse.find()
}

export const createCourse = async (newCourse:InstanceType<typeof modelCourse>) =>{
    await connect()
    return newCourse.save()
}

export const getCourse = async (id:number) =>{
    await connect()
    console.log("id: "+ id)
    return modelCourse.findById(id)
}