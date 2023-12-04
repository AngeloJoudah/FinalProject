import { Header } from "../../components/Header/Header";
import { Footer } from '../../components/Footer/Footer'
import { SettingsAndProfile } from "../../components/misc/SettingsAndProfile";
import { useState, useEffect } from "react";
import { SpinnerLoader } from "../../components/misc/Spinner";
import AvatarIcon from '../../icons/avatar.svg'
import axios from 'axios'
import React from 'react'




export const Template = ({children, style}) => {

  const [image,setImage] = useState(null)
  const [isLoading,setIsLoading] = useState(true)
  const getUserData = async() =>{
    try{
        const request = await axios.get(`https://localhost:8081/api/v2/users/username/${localStorage.getItem("user")}`)
        setImage(request.data.profilePicture)
    } catch(err){
      setImage(AvatarIcon)
    }finally{
        setIsLoading(false)
    }
  }
  useEffect(()=>{
      getUserData()
  },[])

  return (
    <div className="container-fluid">
            <Header/>
            <div className="background" style={style ? style : {backgroundImage:'url(\'/images/logo.jpg\')',backgroundSize:'cover',filter:'contrast(125%)'}}>
            { isLoading ? <SpinnerLoader style={{height:"300px"}}/> :
            <>
              <SettingsAndProfile image={image}/>
              {children}
            </>
            }
            </div>
            <Footer/>
    </div>
  )
}
