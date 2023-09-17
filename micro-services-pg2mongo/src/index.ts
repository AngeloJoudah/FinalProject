import createListener from 'pg-listen'
import { modelUser } from './user'
import mongoose from 'mongoose'

const {Client} = require('pg')

const url:string = process.env.MG_URL || ""

const pgconfig = {
    user:process.env.PGQL_USERNAME,
    host:process.env.PGQL_HOST,
    database:process.env.PGQL_DATABASE,
    password:process.env.PGQL_PASSWORD,
    port:Number(process.env.PGQL_PORT),
    ssl:true
}

interface notification{
    username:string,
    name:string,
    last_name:string
}
const updateMongoDB = async (notification:notification) =>{
    const {username,name,last_name} = notification
    const newUser = new modelUser({username:username,firstName:name,lastName:last_name})
    await mongoconnect()
    await newUser.save().then(e =>{
        e
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
