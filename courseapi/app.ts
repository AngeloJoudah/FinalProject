import express from 'express'
import CourseRouter from './Router/CoursesRouter'
import bodyParser from 'body-parser'
import UserRouter from './Router/UserRouter'
import ChatsRouter from './Router/ChatsRouter'
const cors = require('cors')
const app = express()
const PORT = 8081
app.use(express.json())
app.use(cors())
app.use(bodyParser.json({ limit: '10mb' }))
app.use('/api/v2/courses',CourseRouter)
app.use('/api/v2/users',UserRouter)
app.use('/api/v2/chats',ChatsRouter)
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})
