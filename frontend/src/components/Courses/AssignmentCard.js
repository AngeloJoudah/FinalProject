import Card from 'react-bootstrap/Card'
import {Button } from 'react-bootstrap'
import Paper from '../../icons/newspaper-outline.svg'
import Ellipsis from '../../icons/ellipsis-vertical-outline.svg'
import axios from 'axios'
import { useState } from 'react'

export const AssignmentCard = ({name, due, courseId, assignmentId}) =>{
  const [style,setStyle] = useState({})
  const [dropdown,showDropdown] = useState(false)
  const remove = async() =>{
    try{
      await axios.delete(`https://localhost:8081/api/v1/assignments/${assignmentId}`)
    }catch{
      alert('Failed to delete assignment. Try again')
    }
  }
  const onHoverHandler = () =>{
    setStyle({border:"2px solid black", borderRadius:"50%", background:"gray"})
  }
  const onHoverLeave = () =>{
    setStyle({})
  }
  const onClickHandler = () =>{
    dropdown ? showDropdown(false) : showDropdown(true)
  }
  const dropDownMenu = <></>
    return(
        <Card className='flex-shrink-1 offset-1 col-lg-1 col-md-3 col-sm-4 col-xs-3 mx-2' >
          <div className='dropdown'>
            <img className='offset-9 col-3 dropdown-toggle' src={Ellipsis} onClick={onClickHandler} onMouseEnter={onHoverHandler} onMouseLeave={onHoverLeave} style={style}/>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </div>
        <Card.Img variant="top" src={Paper} />
        <Card.Header>
            {name}
          </Card.Header>
          <Card.Body>
          <Card.Text>
            {due}
          </Card.Text>
          <Button variant="primary" href={`/course/${courseId}/assignment/${assignmentId}`}>Visit</Button>
        </Card.Body>
      </Card>
    );
}