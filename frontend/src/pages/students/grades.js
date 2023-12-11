import React, { useEffect, useState } from 'react'
import { Template } from '../shared/template'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import { SpinnerLoader } from '../../components/misc/Spinner'
export const Grades = () => {
    const [grades,setGrades] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const getGrades = async()=>{
        try{
            const req = await axios.get(`https://ofcourse.website/api/v2/submissions/user/${localStorage.getItem('_id')}`)
            console.log(req.data)
            setGrades(req.data.submissions.map(e=>{return(
                <div className='row card'>
                    <div className='card-body col-12'>
                        <h1 style={{textAlign:'center'}} className='offset-4 col-4'>{e.assignment.name}</h1>
                        <h5 ><strong>Comments: </strong> {e.comments}</h5>
                        <h1><strong>Grade: </strong> {e.grade}</h1>
                    </div>
                </div>
            )}))
        }catch(err){
            console.log(err)
        }finally{
            setIsLoading(false)
        }
    }
    useEffect(()=>{
        getGrades()
    }
    ,[])

  return (
    <Template>
        <div className='container'>
            {isLoading ? <SpinnerLoader/> : grades}
        </div>
    </Template>
  )
}