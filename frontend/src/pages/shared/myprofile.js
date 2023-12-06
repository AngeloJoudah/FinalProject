import { Template } from './template'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Check from '../../icons/checkmark-circle-outline.svg'
import Cross from '../../icons/close-circle-outline.svg'
import { SpinnerLoader } from '../../components/misc/Spinner'
import Avatar from '../../icons/avatar.svg'
export const Profile = () => {

    const [isHovered,setIsHovered] = useState(false)
    const [description,setDescription] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [image,setImage] = useState('')
    const [editing,setEditing] = useState(false)
    const [newText,setNewText] = useState('')
    const [lengthError,setLengthError] = useState(false)
    const getUserData = async() =>{
        try{
            const request = await axios.get(`http://localhost:8081/api/v2/users/username/${localStorage.getItem("user")}`)
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
    const updateDescription = async() =>{
      try{
        if(newText.length > 0){
          const req = await axios.put('http://localhost:8081/api/v2/users/description',{_id:localStorage.getItem('_id'),text:newText})
          if(req.status == 200){
            setDescription(newText)
          }
          setLengthError(false)
          setEditing(false)
        }
        else{
          setLengthError(true)
        }
      }catch{

      }
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
              `http://localhost:8081/api/v2/users/image`,
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
    <h1 style={{textAlign:"center"}}>{localStorage.getItem('user')}</h1>
    <hr className='mb-5' style={{border:"2px solid black"}}></hr>
    <h1 className='mx-5 mb-5'> Edit your user profile: </h1>
        <div className='row container-fluid' style={{width:"25vw",height:"25vw",position:"relative"}}>
            <input onChange={sendImage} type="file" id="fileInput" style={{"display":"none"}} accept=".jpg, .png, .jpeg" />
            {isLoading ? <SpinnerLoader/> : 
            <img
          src={image ? image : Avatar}
          className={`offset-1 col-3 mb-5 ${isHovered ? 'hovered' : ''}`}
          alt='user profile'
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            objectFit: 'cover',
            transition: '.2s'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={setImageProfile}
        />}
            <div style={{  position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>

            </div>


        </div>
        <div className='row'>
            <h5 onClick={()=>editing ? null : setEditing(true)}>
              (click me to edit!) Description: "
              {editing ? 
                <div className='container-fluid'>
                  {lengthError ? <h1 style={{color:"red"}}>New description cannot be empty.</h1> : null}
                  <input type='text' className='col-12' onChange={e => setNewText(e.target.value)}/>
                  <img className='offset-8 col-2' src={Check} style={{height:'10vh'}} onClick={updateDescription}/>
                  <img className='col-2' src={Cross} style={{height:'10vh'}} onClick={()=>{setEditing(false);setNewText('')}}/>
                </div>
              : description}"
            </h5>
        </div>
    </>
    </Template>
  )
}
