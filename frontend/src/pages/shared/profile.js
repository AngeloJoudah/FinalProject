// ALL PROFILE
import { Template } from './template'

import React, {useState, useEffect} from 'react'
import PhoneIcon from '../../icons/phone-icon.svg'
import CalendarIcon from '../../icons/calendar-outline.svg'
import ChatBubbleIcon from '../../icons/chatbubble-outline.svg'
import axios from 'axios'
import defaultImageIcon from '../../icons/avatar.svg'
import { SpinnerLoader } from '../../components/misc/Spinner'

export const Profile = () => {

    const [isHovered,setIsHovered] = useState(false)
    const [description,setDescription] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [image,setImage] = useState('')
    const getUserData = async() =>{
        try{
            const request = await axios.get(`https://localhost:8081/api/v2/users/username/${localStorage.getItem("user")}`)
            setImage(request.data.profilePicture)
            setDescription(request.data.description)
        } catch(err){

        }finally{
            setIsLoading(false)
        }

    }
    useEffect(()=>{
        getUserData()
    },[])

    const setImageProfile = () =>{
        document.getElementById('fileInput').click()
    }
    const sendImage = async (event) => {
        event.preventDefault();
        const selectedFile = event.target.files[0];
      
        if (selectedFile) {
          const reader = new FileReader();
      
          reader.onload = (e) => {
            const base64String = e.target.result;
            setImage(base64String);
      
            // After setting the image state, send the POST request
            axios.post(
              `https://localhost:8081/api/v2/users/image`,
              { profilePicture: base64String, username: localStorage.getItem('user') },
              { headers: { 'Content-Type': 'application/json' } }
            )
              .then((response) => {
              })
              .catch((error) => {
                console.log(error)
              });
          };
      
          reader.readAsDataURL(selectedFile);
        }
      };

  return (
    <Template>
    <>
        <div className='row container-fluid' style={{width:"25vw",height:"25vw",position:"relative"}}>
            <input onChange={sendImage} type="file" id="fileInput" style={{"display":"none"}} accept=".jpg, .png, .jpeg" />
            {isLoading ? <SpinnerLoader/> : 
            <img src={image}
            className='offset-1 col-3 mb-5'
            alt='user profile'
            style={{width:"100%",height:"100%", borderRadius:"50%",overflow:"hidden",
            filter:isHovered? "brightness(25%)" : null, objectFit:"cover",
            transition:".2s"}} 
            onMouseEnter={()=>{setIsHovered(true)}} 
            onMouseLeave={()=>{setIsHovered(false)}}
            onClick={setImageProfile}
            />}
            <div style={{  position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>

            </div>


        </div>
        <div className='row my-3'>
            <h1 className='col-4'>Who am I?</h1>
            <img className='offset-5 col-1' src={PhoneIcon} height={"30vh"} />
            <img className='col-1' src={CalendarIcon} height={"30vh"} />
            <img className='col-1' src={ChatBubbleIcon} height={"30vh"} />
        </div>
        <div className='row'>
            <h5> There should be a description here.</h5>
        </div>
    </>
    </Template>
  )
}
