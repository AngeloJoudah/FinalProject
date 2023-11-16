import { modelSubmission } from '../Model/SubmissionModel'
import express from 'express'

const SubmissionRouter = express.Router();

SubmissionRouter.post('/',async(request,response)=>{
    const {user,instructor,course,assignment,content} = request.body
    if(!user && !instructor && !course && !assignment && !content){
        return response.status(400).json('Invalid request body')
    }
    else{
        try{
            const newSubmission = new modelSubmission({
                user:user,
                instructor:instructor,
                course:course,
                assignment:assignment,
                content:content
            })
            await newSubmission.save()
            response.status(200)

        }catch(err){
            response.status(500).json({error:'Internal Server error'})
        }
    }

})
SubmissionRouter.get('/:id',async(request,response)=>{
    const id = request.params.id
    try{
        const submission = await modelSubmission.findById(id)
        if(!submission){
            return response.status(404).json('Requested submission could not be found.')
        }
        response.status(200).json(submission)
    }catch(err){
        console.log(err)
        response.status(500).json('Internal Server Error.')
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
SubmissionRouter.put('/comments',async(request,response)=>{
    const {id,comments} = request.body
    try{
        const submission = await modelSubmission.findByIdAndUpdate(id,{$push:{comments:comments}})
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
    const {id,grade} = request.body
    try{
        const submission = await modelSubmission.findByIdAndUpdate(id,{grade:grade})
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