import React, { useEffect, useState } from 'react'
import { Template } from '../shared/template'
import { AssignmentPDF } from '../../components/Courses/AssignmentPDF'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'
import { SpinnerLoader } from '../../components/misc/Spinner'
import { Button } from 'react-bootstrap'
export const Submission = () => {
    const {submissionId, courseId, assignmentId} = useParams()
    const [pdfBuffer,setPDFBuffer] = useState('')
    const [isLoading,setIsLoading] = useState(true)
    const [grade,setGrade] = useState(0)
    const [err,setErr] = useState(false)
    const [comment,setComment] = useState('')
    const nav = useNavigate()
    const getSubmission = async()=>{
        try{
            const req = await axios.get(`https://ofcourse.website/api/v2/submissions/${submissionId}`)
            setPDFBuffer(req.data.buffer.data)
            console.log(req.data.buffer.data)
        }catch(err){
            console.log(err)
            setErr(true)
        }finally{
            setIsLoading(false)
        }
    }
    useEffect(()=>{
        getSubmission()
    },[])
    const doGrade = async(event) =>{
        try{
            event.preventDefault()
            const req = await axios.put(`https://ofcourse.website/api/v2/submissions/grade`,{
                grade:grade,
                comment:comment,
                id:submissionId
            })
            nav(`/course/${courseId}/assignment/${assignmentId}`)
        }catch(err){
            console.log(err)
            setErr(true)
        }
    }
  return (
    <Template>
        <div className='row'>
            {isLoading ? <SpinnerLoader/> : <AssignmentPDF ArrayBuffer={pdfBuffer}/>}
            <form onSubmit={doGrade}>
                <h5>Grade:</h5>
                <input type='text' pattern="\d{1,3}" onChange={e=>{e.preventDefault();setGrade(e.target.value)}} />
                <h5>Comments</h5>
                <input type='text' onChange={e=>{e.preventDefault();setComment(e.target.value)}}/>
                <div className='col-12' />
                <Button type='submit' className='mt-3'>Submit</Button>
            </form>
            {err ? <h1 style={{color:"red"}}> Something went wrong. Refresh to try again.</h1> : null}
        </div>
    </Template>
  )
}
