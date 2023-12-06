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
const app = express()
const PORT = 8081
const cors = require('cors')
app.use(cors())
app.use(express.json({ limit: '20mb' }));
app.use(bodyParser.json({ limit: '20mb' }))
app.use('/api/v2/courses',CourseRouter)
app.use('/api/v2/users',UserRouter)
app.use('/api/v2/chats',ChatsRouter)
app.use('/api/v2/zoom',ZoomRouter)
app.use('/api/v2/assignments',AssignmentsRouter)
app.use('/api/v2/complements',ComplementsRouter)
app.use('/api/v2/awards',AwardRouter)

app.listen(PORT,async ()=>{
    console.log(`server running on port ${PORT}`)
    await connect()
})
