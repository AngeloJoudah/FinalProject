import express from 'express'
import CourseRouter from './Router/CoursesRouter'
import bodyParser from 'body-parser'
import UserRouter from './Router/UserRouter'
import ChatsRouter from './Router/ChatsRouter'
import { connect } from './Mongo/MongoConfig'
import AssignmentsRouter from './Router/AssignmentRouter'
import ZoomRouter from './Router/ZoomRouter'
import ComplementsRouter from './Router/ComplementsRouter'
import AwardRouter from './Router/AwardRouter'
import SubmissionRouter from './Router/SubmissionRouter'
const cors = require('cors')
const app = express()
const fs = require('fs')
const https = require('https')
const PORT = 8081
const sslOptions = {
    pfx: fs.readFileSync('./certificates/backend.p12'),
    passphrase: "Bella514!"
  };
app.use(cors())
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }))
const corsOptions = {
    origin: ['*'],
    credentials: true
};

const healthCheck = express.Router()
healthCheck.get('/',async(_request,response)=>{
    response.status(200).json({message:'OK'})
})
app.use(cors(corsOptions));
app.use(express.json({ limit: '20mb' }));
app.use(bodyParser.json({ limit: '20mb' }))
app.use('/api/v2/',healthCheck)
app.use('/api/v2/courses',CourseRouter)
app.use('/api/v2/users',UserRouter)
app.use('/api/v2/chats',ChatsRouter)
app.use('/api/v2/zoom',ZoomRouter)
app.use('/api/v2/assignments',AssignmentsRouter)
app.use('/api/v2/complements',ComplementsRouter)
app.use('/api/v2/awards',AwardRouter)
app.use('/api/v2/submissions',SubmissionRouter)
const server = https.createServer(sslOptions, app)

server.listen(PORT,async ()=>{
    console.log(`server running on port ${PORT}`)
    await connect()
})