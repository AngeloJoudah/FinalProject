import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Template } from '../shared/template'
import { PersonCard } from '../../components/Courses/PersonCard'
import { SpinnerLoader } from '../../components/misc/Spinner'
import { Doesnotexist } from '../shared/doesnotexist'
import axios from 'axios'
import check from '../../icons/checkmark-circle-outline.svg'
import close from '../../icons/close-circle-outline.svg'
import { Image } from 'react-bootstrap'
export const Admit = () => {
    const [users,setUsers] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [courseName,setCourseName] = useState('')
    const [err,setErr] = useState(false)
    const [notFound,setNotFound] = useState(false)
    const {courseId} = useParams()
    const reject = async(id) =>{
        try{
            await axios.put(`http://localhost:8081/api/v2/courses/enrolling/remove`,{courseId: courseId, userId: id})
        }catch(error){
            console.log(error)
        }
    }
    const enroll = async(id) =>{
        try{
            await axios.put(`http://localhost:8081/api/v2/courses/admit`,{courseId: courseId, userId: id})
        }catch(error){
            console.log(error)
        }
    }
    const getCourse = async() =>{
        try{
            const request = await axios.get(`http://localhost:8081/api/v2/courses/${courseId}`)
            setCourseName(request.data.name)
            setUsers(request.data.enrolling)
        }catch(err){
            console.log(err)
            err.response?.status === 404 
            ? setNotFound(true)
            : setErr(true)
        }
        finally{
            setIsLoading(false)
        }
    }
    useEffect(()=>{
        getCourse()
    },[])
  return (

    <Template>
            
            {isLoading ? 
            <SpinnerLoader/> 
            : users.length > 0 && !notFound && !err ?
            <div className='container-fluid'>
                <h1>Admit Students</h1>
                <h5>Here you can see a list of those who have applied to take {courseName}</h5>
                <h6>By clicking 'allow', you are agreeing to allow the students to take your course. Denying will simply result in the request being removed.</h6>
                <div className='row'>
                    {users.map(user =>{
                        return <div className='col-3'>
                            <PersonCard name={user.username} image={user.profilePicture} key={user._id}  />
                            <div className='row'>
                                <Image src={check} className='offset-6 col-3' onClick={()=>{enroll(user._id)}}/>
                                <Image src={close} className='col-3' onClick={()=>{reject(user._id)}}/>
                            </div>
                        </div>
                    })}
                </div>
                
            </div>
            : !notFound && !err && users.length < 1 ?
            <h1>No students are currently trying to enroll</h1>
            : notFound 
            ? <Doesnotexist /> :
            <h1 style={{textAlign:"center"}}><strong>A network error has occured: Try refreshing this page.</strong></h1>
            }
    </Template>
  )
}
