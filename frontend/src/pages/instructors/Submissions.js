import React, { useEffect, useState } from 'react'
import { Template } from '../shared/template'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'
import { SpinnerLoader } from '../../components/misc/Spinner'
import { PersonCard } from '../../components/Courses/PersonCard'
export const Submissions = () => {
    const nav = useNavigate()
    const [name,setName] = useState('')
    const [submissions,setSubmissions] = useState([])
    const [subError,setSubError] = useState(false)
    const [assignError,setAssignError] = useState(false)
    const [aloading,setALoading] = useState(true)
    const [sLoading,setSLoading] = useState(true)
    const {assignmentId, courseId} = useParams()
    const getAssignment = async() =>{
        try{
            const req = await axios.get(`https://ofcourse.website/api/v2/assignments/${assignmentId}`)
            setName(req.data.name)
        }catch(err){
            console.log(err)
            setAssignError(true)
        }finally{
            setALoading(false)
        }
    }
    const getSubmissions = async() =>{
        try{
            const req = await axios.get(`https://ofcourse.website/api/v2/submissions/assignment/${assignmentId}`)
            console.log(req.data)
            setSubmissions(req.data.submissions.map(e=>{
                return <div onClick={()=>{nav(`/course/${courseId}/assignment/${assignmentId}/submissions/${e._id}`)}}><PersonCard canClick={false} image={e.user.profilePicture} id={e.user._id}/>Click to see {e.user.username}'s submission</div>
            }))
        }catch(err){
            console.log(err)
            setSubError(true)
        }finally{
            setSLoading(false)
        }
    }
    useEffect(()=>{
        getAssignment()
        getSubmissions()
    },[])
  return (
    <Template>
        {!sLoading || !aloading ? 
            !assignError || ! subError ? 
            <div>
                <h1 style={{textAlign:"center"}}>See submissions for: {name}</h1>
                <hr/>
                {submissions}

            </div>
            : <h1>Something went wrong. Refresh to try again <hr/></h1>
            
        : <SpinnerLoader/>
        }

    </Template>
  )
}
