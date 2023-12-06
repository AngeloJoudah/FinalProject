import React, { useEffect, useState } from 'react'
import { AssignmentPDF } from '../../components/Courses/AssignmentPDF'
import { useParams } from 'react-router'
import axios from 'axios'
import { Template } from './template'
import { SpinnerLoader } from '../../components/misc/Spinner'
export const Assignment = ({}) => {
    const {assignmentId} = useParams()
    const [name,setName] = useState('')
    const [isLoading,setIsLoading] = useState(true)
    const [pdfBuffer,setPdfBuffer] = useState('')
    const [err,setErr] = useState(false)
    const ErrorMessage = 
    <div style={{textAlign:'center'}}>
        <h1><strong>Something went wrong...</strong></h1>
        <h5>Refresh to try again.</h5>
    </div>
    const request = async()=>{
        setIsLoading(true)
        try{
            const req = await axios.get(`http://localhost:8081/api/v2/assignments/${assignmentId}`)
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
            <h1 style={{textAlign:"center"}}><strong>{name}</strong></h1>
            <AssignmentPDF ArrayBuffer={pdfBuffer}/>
        </div>
        }
    </Template>
  )
}
