import createListener from 'pg-listen'
import { response, user } from './response'
const {Client} = require('pg')
//const {configDotenv} = require('dotenv')
//configDotenv({path:'.env'})

const pgconfig = {
    user:process.env.PGQL_USERNAME,
    host:process.env.PGQL_HOST,
    database:process.env.PGQL_DATABASE,
    password:process.env.PGQL_PASSWORD,
    port:Number(process.env.PGQL_PORT),
    ssl:true//Change when using 
}

export interface notification{
    data:user,
    operation:string
}



const updateMongoDB = async (notification:notification) =>{
    await response(notification)
}


const pgClient = new Client(pgconfig)
const listener = createListener(pgconfig)
listener.notifications.on('_users',updateMongoDB)

const app = async () =>{
    try {
        await pgClient.connect();
        console.log('Connected to PostgreSQL');
        await listener.connect();
        console.log('Listening for changes...');
        await listener.listenTo('_users')
      } catch (err) {
        console.error('Error connecting to PostgreSQL:', err);
      }
}

app()
