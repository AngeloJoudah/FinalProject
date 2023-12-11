import React, { useEffect, useState } from 'react'
import { AssignmentPDF } from '../../components/Courses/AssignmentPDF'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { Template } from './template'
import { SpinnerLoader } from '../../components/misc/Spinner'
import { Button } from 'react-bootstrap'
export const Assignment = ({}) => {
    const [name,setName] = useState('')
    const [isLoading,setIsLoading] = useState(true)
    const [pdfBuffer,setPdfBuffer] = useState('')
    const [err,setErr] = useState(false)
    const nav = useNavigate()
    const {courseId, assignmentId} = useParams()
    const ErrorMessage = 
    <div style={{textAlign:'center'}}>
        <h1><strong>Something went wrong...</strong></h1>
        <h5>Refresh to try again.</h5>
    </div>
    const request = async()=>{
        setIsLoading(true)
        try{
            const req = await axios.get(`https://ofcourse.website/api/v2/assignments/${assignmentId}`)
            setName(req.data.name)
            setPdfBuffer(req.data.content.data)

        }catch(err){
            setErr(true)
            console.log(err)
        }finally{
            setIsLoading(false)
        }
    }
    useEffect(()=>{
        request()
    },[])
  return (
    <Template>
        {isLoading ? 
        <SpinnerLoader/>
        : <div>
            {localStorage.getItem('type') === 'TEACHER' ? <Button onClick={()=>{nav(`/course/${courseId}/assignment/${assignmentId}/submissions`)}}>See Submissions</Button> : null}
            <h1 style={{textAlign:"center"}}><strong>{name}</strong></h1>
            <AssignmentPDF ArrayBuffer={pdfBuffer}/>
            {localStorage.getItem('type') === 'STUDENT' ? <Button className='col-xs-12 col-md-4 offset-md-4 offset-xs-0 col-lg-2 offset-lg-5' onClick={()=>{nav(`/course/${courseId}/assignment/${assignmentId}/submit`)}}>Make a submission</Button>: null}
        </div>
        }
    </Template>
  )
}
