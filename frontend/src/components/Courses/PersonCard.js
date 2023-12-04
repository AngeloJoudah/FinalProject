import React from 'react'
import { useState } from 'react';
import profileIcon from '../../icons/avatar.svg'
import { useNavigate} from 'react-router-dom';
import { Card } from 'react-bootstrap';
export const PersonCard = ({name, image, id}) => {

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
    nav(`/profile/${id}`)
  };

  return (
    <Card className=''
    onMouseEnter={handleMouseEnter} 
    onMouseLeave={handleMouseLeave}
    onClick={() => onClickHandler()}
    style={{border:"",textAlign:'center', width:"30vh",height:"30vh", borderRadius:'50%'}}
    >
      <Card.Img src={image} style={{ border:"",textAlign:'center', width:"30vh",height:"30vh", borderRadius:'50%'}} onError={()=>{setImg(profileIcon)}}  />
      <Card.Body>
        <Card.Text className='card-title' style={{textAlign:'center',fontSize:''}}>{name}</Card.Text>
      </Card.Body>
  </Card>
  )
}

