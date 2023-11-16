import React from 'react'
import { useState } from 'react';
import profileIcon from '../../icons/avatar.svg'
import { useNavigate} from 'react-router-dom';
import { Card } from 'react-bootstrap';
export const PersonCard = ({name, image}) => {

  const nav = useNavigate()
  const [isHovered, setHovered] = useState(false);
  const [img, setImg] = useState(image)
  const handleMouseEnter = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };
  const onClickHandler = () => {
    nav(`/chats/messages/${name}`);
  };

  return (
    <Card className=''
    onMouseEnter={handleMouseEnter} 
    onMouseLeave={handleMouseLeave}
    onClick={() => onClickHandler()}
    style={{border:".5px solid black",textAlign:'center', width:"30vh",height:"30vh", borderRadius:'50%'}}
    >
      <Card.Img src={image} style={{maxHeight:"100%",maxWidth:"100%",overflow:'hidden'}} onError={()=>{setImg(profileIcon)}}  />
      <Card.Body>
        <Card.Text className='card-title' style={{textAlign:'center',fontSize:''}}>{name}</Card.Text>
      </Card.Body>
  </Card>
  )
}

