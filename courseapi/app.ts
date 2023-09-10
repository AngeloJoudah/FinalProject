import express from 'express'
import CourseRouter from './Router/CoursesRouter'
import cors from 'cors'
import bodyParser from 'body-parser'
import UserRouter from './Router/UserRouter'
const app = express()
const PORT = 80
app.use(express.json())
app.use(cors())
app.use(bodyParser.json({ limit: '10mb' }))
app.use('/api/courses',CourseRouter)
app.use('/api/users',UserRouter)
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})
