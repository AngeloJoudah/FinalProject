import React, { useEffect, useState } from 'react'
import { Template } from '../shared/template'
import { SpinnerLoader } from '../../components/misc/Spinner'
import { useNavigate, useParams } from 'react-router'
import { PersonCard } from '../../components/Courses/PersonCard'
import { AssignmentCard } from '../../components/Courses/AssignmentCard'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import Eye from '../../icons/eye-outline.svg'
import EyeClosed from '../../icons/eye-off-outline.svg'
import Bell from '../../icons/notifications-outline.svg'
import { Doesnotexist } from '../shared/doesnotexist'
import { Recipient } from '../../components/Courses/Recipient'
export const Course = () => {
    const [image,setImage] = useState('/images/pulsar.jpg')
    const [isLoading,setIsLoading] = useState(true)
    const [roster,setRoster] = useState([])
    const [assignments,setAssignments] = useState([])
    const [key,setKey] = useState('Roster')
    const [courseName, setCourseName] = useState('')
    const {courseId} = useParams()
    const [isShown,setIsShown] = useState(false)
    const [code,setCode] = useState(null)
    const [pageError,setPageError] = useState(false)
    const [codeError,setCodeError] = useState(false)
    const [search,setSearch] = useState('')
    const [enrolling,setEnrolling] = useState(0)
    const [searchResults,setSearchResults] = useState([])
    const [recipients,setRecipients] = useState([])
    const [emails,setEmails] = useState([])
    const nav = useNavigate()
    const getCourseData = async()=>{
        try{
            const request = await axios.get(`https://localhost:8081/api/v2/courses/${courseId}`)
            console.log(request.data)
            setImage(request.data.image)
            setRoster(request.data.roster)
            setCourseName(request.data.name)
            setAssignments(request.data.assignments)
            request.data.enrolling ? setEnrolling(request.data.enrolling.length) : setEnrolling(0)
            if(request.data.code){
                setCode(request.data.code)
            }
        }catch(error){
            if(error.response.status === 404){
                setPageError(true)
            }
            console.log(error)
        }
    }
    const generateNewCode = async() =>{
        if(localStorage.getItem('type') === 'TEACHER'){
            try{
                const request = await axios.put(`https://localhost:8081/api/v2/courses/code`,{id:courseId})
                setCode(request.data.code)
            }catch{
                setCodeError(false)
            }
        }
    }
    const lookUp = async() =>{
        if(search && search.length > 0){
            try{
                const req = await axios.get(`https://localhost:8081/api/v2/users/search/${search}`)
                setSearchResults(req.data)
            }catch(err){
                console.log(err)
                setSearchResults([])
            }
        }
    }
    useEffect(()=>{
        getCourseData()
        setIsLoading(false)
    },[])

    useEffect(()=>{
        lookUp()
    },[search])

  return (
    <Template>
        {!isLoading && !pageError ? 
        <>

        {localStorage.getItem('type') === 'TEACHER' ?
        <div className='row align-items-center'>
            <div className='offset-1 col-1' onClick={()=>nav(`/course/${courseId}/admit`)}>
                <img className='img' src={Bell}/>
                <h1 style={{}}>{enrolling}</h1>
            </div>
            <h5 className='offset-10 col-1 my-5'>Registration Code: </h5>
            <img className='col-1' src={isShown ? Eye : EyeClosed} style={{height:"40px"}} onClick={()=>{setIsShown(!isShown)}}/>
            <h5 className='offset-10 col-1'>{isShown ? code : '****'}</h5>
            <Button className='col-1' onClick={generateNewCode}>Generate New Code</Button>
            <a className='offset-10 col-1' href={recipients.length > 0 ? `mailTo:${emails}?subject=Access%20Code&body=${code}` : '#'}><h6>Mail the code:</h6></a>
            <input className='col-lg-2 col-sm-5 offset-sm-6 offset-lg-9 mb-3' type='text' placeholder='Lookup by username to add to mailing list' onChange={e=>{setSearch(e.target.value)}}/>
            <div className='search-dropdown'>
                <div className="dropdown-content mb-5">
                    {searchResults.length > 0 ? searchResults.map(recipient => (
                        <Recipient
                            col='col-lg-2 col-sm-5 offset-sm-6 offset-lg-9'
                            image={recipient.profilePicture}
                            name={recipient.username}
                            onClick={() => {
                                if (!recipients.find(r => recipient._id === r._id)) {
                                    setRecipients(recipients.concat(recipient));
                                    setEmails(emails.concat(recipient.email));
                                    console.log(recipients);
                                }
                                setSearchResults([])
                            }}
                        />
                    )) : null}
                </div>
            </div>
            {recipients.length > 0 ? 
                recipients.map(recipient => (
                    <Recipient col={'col-lg-2 col-sm-5 offset-sm-6 offset-lg-9'} image={recipient.profilePicture} name={recipient.username} key={recipient._id} />
                )) 
            : null}
        </div>
        : null
        }
            <h1 className='my-5' style={{textAlign:"center",}}><strong>{courseName}</strong></h1>
            <hr color="black" className="my-5" size="10" align="center"/>
            <div className='row' style={{border:"solid black 5px"}}>
                <img className='img-fluid col-12 p-0' style={{height:"100vh",width:"100vw"}} src={image}/>
            </div>
            <div className='row mt-5'>
            <Tabs
            defaultActiveKey="Roster"
            id="uncontrolled-tab-example"
            className="mb-3 offset-4 col-4"
            onSelect={(key)=>{setKey(key)}}
            style={{justifyContent:"center"}}

                >
            <Tab eventKey="Roster" title="Roster">
                {
                roster.length > 0 ? 
                <div className='row'>
                {roster.map(person =>{
                    return <PersonCard name={person.username} image={person.profilePicture} id={person._id} />
                })} </div>
                : <h1 style={{textAlign:"center"}}>There are no enrolled students yet</h1>
                }
            </Tab>

            <Tab eventKey="Assignments" title="Assignments">
                {localStorage.getItem('type') === 'TEACHER' ? <Button href={`${window.location.href}/assignments/create`} className='my-3'>Create + </Button> : null}
                {
                assignments.length > 0 ?
                <div className='row'>
                 {assignments.map(assignment =>{
                    return <AssignmentCard name={assignment.name} due={assignment.dueDate} assignmentId={assignment._id} courseId={courseId} />
                })}   
                </div>
                : <h1 style={{textAlign:"center"}}>There are no assignments just yet!</h1>
                }
            </Tab>
            </Tabs>
            </div>
            
        </>
        : isLoading ? <SpinnerLoader style={{height:"100%",width:"100%",alignSelf:"center"}}/>
                : <Doesnotexist/>
        }
    </Template>
  )
}
