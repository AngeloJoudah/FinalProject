import Card from 'react-bootstrap/Card'
import {Button } from 'react-bootstrap'
import { useState } from 'react'
export const CourseCard = ({image, name, description, courseId}) =>{
  const [isHovering,setIsHovering] = useState(false)
  const setHovering = () =>{
    setIsHovering(!isHovering)
  }
    return(
        <Card className='flex-shrink-1' onMouseEnter={setHovering} onMouseLeave={setHovering} style={isHovering ? {
        transition:"all ease 2.0s", 
        width:"500px", 
        height:"500px"} 
        : null}>
        <Card.Img variant="top" src={image} />
        <Card.Header>
            {name}
          </Card.Header>
          <Card.Body>
          <Card.Text>
            {description}
          </Card.Text>
          <Button variant="primary" href={`/course/${courseId}`}>Visit</Button>
        </Card.Body>
      </Card>
    );
}