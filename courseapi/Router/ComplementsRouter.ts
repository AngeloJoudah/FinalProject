import  Express  from "express";
import { modelComplements } from "../Model/ComplementsModel";
import { modelUser } from "../Model/UserModel";
import uploadImageToAzure from "../function/uploadImagetoAzure";
import retrieveBlobFromUrl from "../function/GetFromAzureStorage";
import mongoose from "mongoose";
const ComplementsRouter = Express.Router()
ComplementsRouter.post('/',async(request,response)=>{
    const {_id, file, fileName, fileType} = request.body;
    console.log(fileType)
    if(!fileType){
      return response.status(400)
    }
    if(!_id || !file || !fileName || !fileType){
        return response.status(400).json({error:"Missing userId"})
    }else{
        try{
            const creator = await modelUser.findById(_id)
            if(!creator){
                return response.status(404).json({error:"Invalid id. User not found."})
            }
            const url = await uploadImageToAzure(file,fileName)
            const newComplement = await new modelComplements({creator:creator,original:false,file:url,fileType:fileType}).save()
            await creator.updateOne({$addToSet:{complementsGiven:newComplement}})
            response.status(200).json({message:"Complement added successfully."})

        }catch(err){
            console.log(err)
            return response.status(500).json({error:'Internal server error.'})
        }
    }
})

ComplementsRouter.post('/original',async(request,response)=>{
  const {file, fileName} = request.body;
  console.log(file,fileName)
  //console.log(file)
  if(!file && !fileName){
      return response.status(400).json({error:"Missing file or filename."})
  }else{
      try{
          const url = await uploadImageToAzure(file,fileName)
          await new modelComplements({original:true,file:url}).save()

          response.status(200).json({message:"Complement added successfully."})

      }catch(err){
          console.log(err)
          return response.status(500).json({error:'Internal server error.'})
      }
  }
})

ComplementsRouter.get('/user/:_id/pagination/:page', async (request, response) => {
  const id = request.params._id;
  const page = Number(request.params.page) * 5;

  try {
    const creator = await modelUser
      .findById(id)
      .populate({path: 'complementsGiven',
      select: 'file fileType _id', 
      options: { lean: true },})
      .exec();

    if (!creator) {
      return response.status(404).json({ error: "Invalid id. User not found." });
    }

    // Extract 'file' and '_id' fields from each complement
    const creatorComplements = creator.complementsGiven.map((complement: any) => ({ _id: complement._id, file: complement.file, fileType:complement.fileType }));

    const defaultComplements = (await modelComplements.find({ original: true }).select('_id file')).map(e => ({ _id: e._id, file: e.file, fileType:e.fileType }));
    const allComplements = [...defaultComplements, ...creatorComplements];

    const paginated = allComplements.slice(page, page + 4);
    
    // Use Promise.all to retrieve blobs for each complement
    const all = await Promise.all(paginated.map(async complement => 
      {
      const complementData = await retrieveBlobFromUrl(complement.file);
      return {
        _id: complement._id,
        data: complementData,
        fileType:complement.fileType
      };
    }))
    
    response.status(200).json(all);
  } catch (err) {
    console.error(err);
    return response.status(500).json({ error: 'Internal server error.' });
  }
});

ComplementsRouter.put('/', async (request, response) => {
    const { giverId, receiverId, complementId } = request.body;
    if (!giverId || !receiverId || !complementId) {
      return response.status(400).json({ error: "One or more IDs are missing." });
    }
    try {
      const giver = await modelUser.findById(giverId).populate({path:'complementsGiven'});
      const receiver = await modelUser.findById(receiverId);
      if (!giver || !receiver) {
        return response.status(404).json({ error: "A user with the IDs could not be found." });
      }
      const outcome = giver.complementsGiven.find(e => e._id.toString() === complementId)
        ? await receiver.updateOne({
            $addToSet: { complementsReceived: new mongoose.Types.ObjectId(giver.complementsGiven[0]._id) }
          })
        : null;
      outcome ? response.status(200).json({ message: 'Complement added successfully.' }) : response.status(404).json({ message: 'Complement not found.' });
    } catch (err) {
      console.log(err);
      response.status(500).json({ error: "Internal server error" });
    }
  });

ComplementsRouter.delete('/',async(request,response)=>{
    const {userId, complementsId} = request.body
    if(!complementsId && !userId){
        return response.status(400).json({error:"Missing either user or complement id."})
    }else{
        try{
            const creator = await modelUser.findById(userId)
            if(!creator){
                return response.status(404).json({error:"Invalid id. User not found."})
            }
            const complement = await modelComplements.findById(complementsId)
            if(!complement){
                return response.status(404).json({error:"Invalid id. Complement not found."})                
            }
            await creator.updateOne({$pull:{complements: complementsId}})
            complement.deleteOne()
            response.status(200).json({message:"Complement added successfully."})

        }catch(err){
            console.log(err)
            return response.status(500).json({error:'Internal server error.'})
        }
    }
})
export default ComplementsRouter;