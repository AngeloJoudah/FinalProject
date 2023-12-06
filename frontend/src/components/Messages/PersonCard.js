import React from 'react'
import { Image } from 'react-bootstrap'
import { useState } from 'react';
import profileIcon from '../../icons/avatar.svg'
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
export const PersonCard = ({name, image, chatId, otherId}) => {

  const nav = useNavigate()
  const [isHovered, setHovered] = useState(false);
  const handleMouseEnter = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };
  const onClickHandler = async () => {
    if(otherId ? otherId.length > 0 : false){
      const arr = [otherId,localStorage.getItem('_id')]
      arr.sort()
      const request = await axios.post('http://localhost:8081/api/v2/chats',{userId:arr[0],otherId:arr[1]})
      nav(`/chats/messages/${request.data._id}`);
    }else{
      nav(`/chats/messages/${chatId}`);
    }
  };

  return (
    <div className='row align-items-center' style={{
      background: isHovered ? 'lightblue' : 'white',
      padding: '20px',
      border: '1px solid #ccc'
    }} 
    onMouseEnter={handleMouseEnter} 
    onMouseLeave={handleMouseLeave}
    onClick={() => onClickHandler()}
    >
      <Image className={`offset-1 col-lg-1 col-md-3 col-sm-4 col-xs-3`} src={image ? image : profileIcon}/>
      <h5 className='col-4' style={{textAlign:'center'}}>
      {name}
      </h5>
  </div>
  )
}
