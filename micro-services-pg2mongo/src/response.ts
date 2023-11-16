import {notification} from './index'
import { modelUser } from './user'
import mongoose from 'mongoose'
const {configDotenv} = require('dotenv')
configDotenv({path:'.env'})

export interface user{
    firstname:string,
    lastname:string,
    username:string,
    userType:string
}

export const response = async(notif:notification) =>{
    console.log(notif)
    await mongoconnect()
    if(notif.operation === 'CREATE'){
        const {username,firstname,lastname,userType} = notif.data
        const newU:user = {username,firstname,lastname,userType}
        const newUser = new modelUser(newU)
        await newUser.save().then(e =>{
            e
        })
    }
    else if(notif.operation === 'UPDATE'){
        const {username,firstname,lastname,userType} = notif.data
        const newU:user = {username,firstname,lastname,userType}
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