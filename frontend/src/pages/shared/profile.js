import { Template } from './template'
import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router'
import PhoneIcon from '../../icons/phone-icon.svg'
import CalendarIcon from '../../icons/calendar-outline.svg'
import ChatBubbleIcon from '../../icons/chatbubble-outline.svg'
import axios from 'axios'
import { SpinnerLoader } from '../../components/misc/Spinner'
import { Button } from 'react-bootstrap'
export const Profile = () => {

    const nav = useNavigate()
    const {personId} = useParams()
    const [isHovered,setIsHovered] = useState(false)
    const [description,setDescription] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [image,setImage] = useState('')
    const [name,setName] = useState('')
    const [isStudent,setIsStudent] = useState(false);

    const getUserData = async() =>{
        try{
            const request = await axios.get(`http://localhost:8081/api/v2/users/id/${personId}`)
            setImage(request.data.profilePicture)
            setDescription(request.data.description)
            setName(request.data.username)
        } catch(err){

        }finally{
            setIsLoading(false)
        }

    }
    const checkIsStudent = async() =>{
        try{
            await axios.get(`http://localhost:8081/api/v2/users/id/${localStorage.getItem('_id')}/student/${personId}`)
            setIsStudent(true)
        }catch(err){
            console.log(err)
        }
    }
    const goToChat = async()=>{
        const arr = [personId,localStorage.getItem('_id')]
        arr.sort()
        console.log(arr)
        const request = await axios.post('http://localhost:8081/api/v2/chats',{userId:arr[0],otherId:arr[1]})
        console.log(request.data)
        nav(`/chats/messages/${request.data._id}`);
    }
    useEffect(()=>{
        getUserData()
        checkIsStudent()
    },[])


  return (
    <Template>
    <>
    <h1 style={{textAlign:"center"}}>{name}</h1>
    {isStudent ? 
        <div className='row d-flex my-5'>
            <h5 style={{color:"teal"}} className='offset-sm-7 col-sm-2 col-xs-12'>
                <strong>Want to tell {name} how great they are doing?</strong>
            </h5>
            <Button onClick={()=>{nav(`/complement/${personId}`)}} className='col-sm-2 col-xs-12'>
                Let them know!
            </Button>
            <div className='col-1'></div>
        </div>
    : null}
    <hr className='mb-5' style={{border:"2px solid black"}}></hr>
        <div className='row container-fluid' style={{width:"25vw",height:"25vw",position:"relative"}}>
            {isLoading ? <SpinnerLoader/> : 
            <img src={image}
            className='offset-1 col-3 mb-5'
            alt='user profile'
            style={{width:"100%",height:"100%", borderRadius:"50%",overflow:"hidden",
            filter:isHovered? "brightness(25%)" : null, objectFit:"cover",
            transition:".2s"}} 
            />}
            <div style={{  position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
            </div>
        </div>
        <div className='row my-3'>
            <h1 className='col-4'>Who am I?</h1>
            <img className='offset-5 col-1' src={PhoneIcon} height={"30vh"} />
            <img className='col-1' src={CalendarIcon} height={"30vh"} />
            <img className='col-1' src={ChatBubbleIcon} height={"30vh"} onClick={goToChat} />
        </div>
        <div className='row'>
            <h5>
              Description: "{description}"
            </h5>
        </div>
    </>
    </Template>
  )
}
