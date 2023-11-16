import express from 'express'
import CourseRouter from './Router/CoursesRouter'
import bodyParser from 'body-parser'
import UserRouter from './Router/UserRouter'
import ChatsRouter from './Router/ChatsRouter'
import { connect } from './Mongo/MongoConfig'
import AssignmentsRouter from './Router/AssignmentRouter'
import ZoomRouter from './Router/ZoomRouter'
const cors = require('cors')
const app = express()
const PORT = 8081
const fs = require('fs')
const https = require('https')
const sslOptions = {
    key: fs.readFileSync('./certificates/key.pem'),
    cert: fs.readFileSync('./certificates/cert.pem'),
    passphrase: "Bella514!"
  };
app.use(cors())
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }))
app.use('/api/v2/courses',CourseRouter)
app.use('/api/v2/users',UserRouter)
app.use('/api/v2/chats',ChatsRouter)
app.use('/api/v2/zoom',ZoomRouter)
app.use('/api/v2/assignments',AssignmentsRouter)
const server = https.createServer(sslOptions, app)
server.listen(PORT,async ()=>{
    console.log(`server running on port ${PORT}`)
    await connect()
})
