import { modelCourse } from '../Model/CourseModel';
import { modelSubmission } from '../Model/SubmissionModel'
import express from 'express'
import uploadFileToAzure from '../function/UploadToAzure';
import { modelAssignment } from '../Model/AssignmentModel';
import retrieveBlobFromUrl from '../function/GetFromAzureStorage';
import { modelUser } from '../Model/UserModel';
const multer = require('multer')
const upload = multer({});
const SubmissionRouter = express.Router();

SubmissionRouter.post('/',upload.any(),async(request,response)=>{
    const {courseId,studentId,assignmentId} = request.body
    const file = request.files
    //console.log(file)
    if(!studentId && !courseId && !assignmentId && !file){
        return response.status(400).json('Invalid request body')
    }
    else{
        try{
            const course = await modelCourse.findById(courseId)
            const instructor = course?.author
            const url = await uploadFileToAzure(file)
            console.log(url)
            const newSubmission = new modelSubmission({
                user:studentId,
                instructor:instructor,
                course:courseId,
                assignment:assignmentId,
                content:url,
                submitted: Date.now() / 1000
            })
            const newSub = await newSubmission.save()
            console.log(newSub.id)
            await modelAssignment.updateOne({_id:assignmentId},{$addToSet:{submissions:newSub}})
            await modelUser.updateOne({_id:studentId},{$addToSet:{submissions:newSub}})
            console.log('saved')
            response.status(200).json({message:"ok"})

        }catch(err){
            console.log(err)
            response.status(500).json({error:'Internal Server error'})
        }
    }
})

SubmissionRouter.get('/user/:id',async(request,response)=>{
    const id = request.params.id
    try{
        const submissions = await modelUser.findById(id).populate({path:'submissions',populate:{path:'assignment',select:'name'}})
        response.status(200).json(submissions)
    }catch(err){
        console.log(err)
        response.status(500).json({error:'Internal server error.'})
    }
})

SubmissionRouter.get('/:id',async(request,response)=>{
    const id = request.params.id
    try{
        const submission = await modelSubmission.findById(id)
        if(!submission){
            return response.status(404).json('Requested submission could not be found.')
        }
        const buf = await retrieveBlobFromUrl(submission.content)
        //console.log(submission.content)
        const resp = {
            buffer:buf,
            _id:submission._id,
            author:submission.user
        }
        response.status(200).json(resp)
    }catch(err){
        console.log(err)
        response.status(500).json({error:'Internal server error.'})
    }
})

SubmissionRouter.get('/assignment/:assignmentId',async(request,response)=>{
    const {assignmentId} = request.params
    if(!assignmentId){
        return response.status(404).json({error:'Assignment ID missing.'})
    }
    try{
        const assignment = await modelAssignment.findById(assignmentId).populate({path:'submissions',populate:{path:'user',select:'_id username profilePicture'},select:'submissions'})
        if(!assignment){
            return response.status(404).json({error:'Assignment not found.'})
        }
        //const submissions = assignment.submissions
        return response.status(200).json(assignment)
    }catch(err){
        console.log(err)
        response.status(500).json({error:'Internal server error'})
    }
})

SubmissionRouter.put('/content',async(request,response)=>{
    const {id,content} = request.body
    try{
        const submission = await modelSubmission.findByIdAndUpdate(id,{content:content})
        if(!submission){
            return response.status(404).json('Requested submission could not be found.')
        }
        response.status(200).json(submission)
    }catch(err){
        console.log(err)
        response.status(500).json('Internal Server Error.')
    }
})

SubmissionRouter.put('/grade',async(request,response)=>{
    const {id,grade,comment} = request.body
    try{
        const submission = await modelSubmission.findByIdAndUpdate(id,{grade:grade,comments:comment})
        if(!submission){
            return response.status(404).json('Requested submission could not be found.')
        }
        response.status(200).json(submission)
    }catch(err){
        console.log(err)
        response.status(500).json('Internal Server Error.')
    }
})
SubmissionRouter.delete('/:id',async(request,response)=>{
    const id = request.params.id
    try{
        const submission = await modelSubmission.findByIdAndRemove(id)
        if(!submission){
            return response.status(404).json('Requested submission could not be found.')
        }
        response.status(200).json('Deletion Successful!')
    }catch(err){
        console.log(err)
        response.status(500).json('Internal Server Error.')
    }
})
export default SubmissionRouter