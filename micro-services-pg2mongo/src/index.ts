import createListener from 'pg-listen'
import { response} from './response'
const {Client} = require('pg')

const pgconfig = {
    user:process.env.PGQL_USERNAME,
    host:process.env.PGQL_HOST,
    database:process.env.PGQL_DATABASE,
    password:process.env.PGQL_PASSWORD,
    port:Number(process.env.PGQL_PORT),
    ssl:true//Change when using 
}


interface data{
        username:String
        name:String,
        last_name:String,
        type:String,
        _id:Number,
        email:String
}

export interface notification{
    data:data,
    operation:string
}



const updateMongoDB = async (notification:notification) =>{
    await response(notification)
}


const pgClient = new Client(pgconfig)
const listener = createListener(pgconfig)
listener.notifications.on('_user',updateMongoDB)

const app = async () =>{
    try {
        await pgClient.connect();
        console.log('Connected to PostgreSQL');
        await listener.connect();
        console.log('Listening for changes...');
        await listener.listenTo('_user')
      } catch (err) {
        console.error('Error connecting to PostgreSQL:', err);
      }
}

app()
