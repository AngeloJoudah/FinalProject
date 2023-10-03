// ALL PROFILE
import { Template } from './template'
import { Image } from 'react-bootstrap'
import React from 'react'
import PhoneIcon from '../../icons/phone-icon.svg'
import CalendarIcon from '../../icons/calendar-outline.svg'
import ChatBubbleIcon from '../../icons/chatbubble-outline.svg'

export const Profile = () => {
    const children = <>
        <div className='row'>
            <Image src="images/funny-photos-llama.jpg" className='col mb-5' style={{maxHeight:"100vh",maxWidth:"100vw"}} />
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
  return (
    <Template children={children}/>
  )
}
