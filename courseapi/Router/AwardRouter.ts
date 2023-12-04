import { modelAwards } from "../Model/AwardsModel";
import express from "express";
import { modelComplements } from "../Model/ComplementsModel";
import { modelUser } from "../Model/UserModel";
import retrieveBlobFromUrl from "../function/GetFromAzureStorage";
const AwardRouter = express.Router()

AwardRouter.post('/', async (request, response) => {
    const { complementId, _id, message, creatorId, title } = request.body;
  
    if (!complementId || !_id || !message || message.length > 500) {
      return response.status(400).json({ error: 'Missing either complement id or person id.' });
    }
  
    try {
      const complement = await modelComplements.findById(complementId);
      const assignee = await modelUser.findById(_id);
  
      const award = await new modelAwards({ message: message, sticker: complement, to: assignee, title:title, time:Date.now().toString() }).save();
  
      await assignee?.updateOne({ $addToSet: { complementsReceived: award } });
      await modelUser.findOneAndUpdate(
        { _id: creatorId?.toString() },
        { $addToSet: { awardsGiven: award } },
        { new: true }
      );  
      response.status(200).json({ message: 'success!' });
    } catch (err) {
      console.error(err);
      return response.status(500).json({ error: 'Internal server error.' });
    }
  });

AwardRouter.get('/id/:id',async(request,response)=>{
    const id = request.params.id
    if(!id){
        return response.status(400).json({error:'Invalid request body.'})
    }
    try{
        const user = await modelUser.findById(id).populate({path:'complementsReceived',populate:{path:'sticker',populate:{path:'creator',select:'username'}},options:{lean:true}}).select('complemensRecieved')
        if(!user){
            return response.status(404).json({error:'Could not find user with id.'})
        }
        const stickers = user.complementsReceived.map((award:any) =>({_id:award._id,file:award.sticker.file,fileType:award.sticker.fileType,message:award.message,title:award.title,time:award.time,instructor:award.sticker.creator,read:award.read}))
        const images = await Promise.all(stickers.map(async award => ({image:await retrieveBlobFromUrl(award.file),fileType:award.fileType,_id:award._id,message:award.message,title:award.title,time:award.time,instructor:award.instructor,read:award.read})))
        response.status(200).json(images)
    }catch(err){
        console.log(err)
        response.status(500).json({error:'Internal server error.'})
    }
})

AwardRouter.put('/read',async(request,response)=>{
  const id = request.body.id
  if(!id){
      return response.status(400).json({error:'Invalid request body.'})
  }
  try{
    await modelAwards.findById(id).updateOne({set:{read:false}})
    response.status(200)
  }catch(err){
      console.log(err)
      response.status(500).json({error:'Internal server error.'})
  }  
})

AwardRouter.get('/awardId/:awardId',async(request,response)=>{
  const id = request.params.awardId
  if(!id){
      return response.status(400).json({error:'Invalid request body.'})
  }
  try{
    const award = await modelAwards.findById(id)
    if(!award){
      return response.status(404).json({error:'Award not found.'})
    }
    await award.updateOne({$set:{read:true}})
    const populated = await award
    .populate({
      path: 'sticker',
      select: 'file fileType',
      populate: {
        path: 'creator',
        select: 'username',
      },
    })
    const arr = [populated]
    const promise = await Promise.all(arr.map(async(award:any)=>{return await retrieveBlobFromUrl(award.sticker.file)}))
    const mapped = {
      ...populated,
      image:promise[0]
    }
    response.status(200).json({mapped})
  }catch(err){
      console.log(err)
      response.status(500).json({error:'Internal server error.'})
  }
})



export default AwardRouter