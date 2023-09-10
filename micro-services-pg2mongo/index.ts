import createListener from 'pg-listen'
import { configDotenv } from 'dotenv'
import { modelUser } from './src/user'
import mongoose from 'mongoose'

const {Client} = require('pg')

configDotenv({
    path:'./.env'
})
const url:string = process.env.MG_URL

const pgconfig = {
    user:process.env.PGQL_USERNAME,
    host:process.env.PGQL_HOST,
    database:process.env.PGQL_DATABASE,
    password:process.env.PGQL_PASSWORD,
    port:process.env.PGQL_PORT,
    ssl:true
}

const updateMongoDB = async (notification) =>{
    const {username,name,last_name} = notification
    const newUser = new modelUser({username:username,firstName:name,lastName:last_name})
    await mongoconnect()
    await newUser.save().then(e =>{
    })
    mongoose.connection.close()
}



const mongoconnect = async() => {
    mongoose.set('strictQuery',false)
    const connection = await mongoose.connect(url)
    return connection
}


const pgClient = new Client(pgconfig)
const listener = createListener(pgconfig)
listener.notifications.on('users',updateMongoDB)

const app = async () =>{
    try {
        await pgClient.connect();
        console.log('Connected to PostgreSQL');
        await listener.connect();
        console.log('Listening for changes...');
        await listener.listenTo('users')
      } catch (err) {
        console.error('Error connecting to PostgreSQL:', err);
      }
}

app()