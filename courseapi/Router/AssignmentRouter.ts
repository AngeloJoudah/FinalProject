import { Router } from "express";
import { modelAssignment } from "../Model/AssignmentModel";
import { modelCourse } from "../Model/CourseModel";
import uploadFileToAzure from "../function/UploadToAzure";
import retrieveBlobFromUrl from "../function/GetFromAzureStorage";
const AssignmentsRouter = Router()
const multer = require('multer')
const upload = multer({});
AssignmentsRouter.post('/',upload.any(),async(request,response)=>{
    const {name, description, courseId, instructorId} = request.body
    const file = request.files
    if(!name && !description && !courseId && !instructorId){
        return response.status(404).json({error:'Invalid Request Body - All fields must be satisfied'})
    }
    else{
        try{
            const url = await uploadFileToAzure(file)
            const newAssignment = new modelAssignment({
                name:name,
                description:description,
                course:courseId,
                instructor:instructorId,
                url:url
            })
            const course = await modelCourse.findByIdAndUpdate(courseId,{$addToSet:{assignments:newAssignment}},{new:true})
            if(!course){
                return response.status(400).json({error:'Course id is invalid for this request.'})
            }
            await newAssignment.save()

            response.status(200).json(newAssignment)
        }catch(e){
            console.log(e)
            response.status(500).json('Internal Server Error')
        }
    }
})

AssignmentsRouter.get('/:id',async(request,response)=>{
    const id = request.params.id
    try{
        const assignment = await modelAssignment.findById(id)
        if(!assignment){
            return response.status(404).json('Requested assignment could not be found.')
        }
        const data = await retrieveBlobFromUrl(assignment.url)
        const payload = {
            name:assignment.name,
            description:assignment.description,
            course:assignment.course,
            instructor:assignment.instructor,
            content:data}
        response.status(200).json(payload)
    }
    catch(err){
        console.log(err)
        response.status(500).json({error:'Internal Server Error'})
    }
})

AssignmentsRouter.put('/:id',async(request,response)=>{
    const {id,name,description} = request.body
    try{
        const assignment = modelAssignment.findByIdAndUpdate(id,{name:name,description:description},{ new: true })
        if(!assignment){
            return response.status(404).json('Requested assignmnent could not be found.')
        }
        response.status(200).json({message:'Assignment updated successfully!'})
    }
    catch(err){
        response.status(500).json({error:'Internal Server Error'})
    }
})

AssignmentsRouter.delete('/:id',async(request,response)=>{
    const id = request.params.id
    try{
        const assignment = modelAssignment.findByIdAndDelete(id)
        if(!assignment){
            return response.status(404).json('Requested assignmnent could not be found.')
        }
        response.status(200).json({message:'Assignment deleted successfully!'})
    }
    catch(err){
        response.status(500).json({error:'Internal Server Error'})
    }
})

export default AssignmentsRouter