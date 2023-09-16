import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config({path:'../.env'})
const url =
process.env.MG_URL || ""
export const connect = async() => {
    mongoose.set('strictQuery',false)
    const connection = await mongoose.connect(url)
    console.log('connection succeeded')
    return connection
}