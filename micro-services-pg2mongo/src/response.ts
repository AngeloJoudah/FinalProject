import {notification} from './index'
import { modelUser } from './user'
import mongoose from 'mongoose'
const {configDotenv} = require('dotenv')
configDotenv({path:'.env'})

export interface user{
    firstname:String,
    lastname:String,
    username:String,
    userType:String,
    postgresId:Number,
    email:String
}

export const response = async(notif:notification) =>{
    await mongoconnect()
    if(notif.operation === 'CREATE'){
        const {username,name,last_name,_id,type,email} = notif.data
        const newU:user = {username:username,firstname:name,lastname:last_name,userType:type,postgresId:_id,email:email}
        const newUser = new modelUser(newU)
        await newUser.save().then(e =>{
            console.log(e)
        })
    }
    else if(notif.operation === 'UPDATE'){
        const {username,name,last_name,_id,type,email} = notif.data
        const newU:user = {username:username,firstname:name,lastname:last_name,userType:type,postgresId:_id,email:email}
        await modelUser.findOneAndUpdate({username:notif.data.username},newU)
    }
    else if(notif.operation === 'DELETE'){
        await modelUser.findOneAndDelete({username:notif.data.username})
    }

    mongoose.connection.close()
}


const mongoconnect = async() => {
    mongoose.set('strictQuery',false)
    const connection = await mongoose.connect(process.env.MG_URL || "")
    return connection
}