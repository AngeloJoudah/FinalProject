import mongoose from "mongoose"
const url =
`mongodb://docdbfp:Ols5yE5Gqvn0ikyzcRkccAa8HC7gq8ASNm329sdpuaJKEl15ruuxV26fj4H3BValc4TfOxO7WzSGACDbtBu1iA%3D%3D@docdbfp.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@docdbfp@`
export const connect = async() => {
    mongoose.set('strictQuery',false)
    const connection = await mongoose.connect(url)
    console.log('connection succeeded')
    return connection
}