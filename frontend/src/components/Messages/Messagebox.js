import React from 'react'
import messageIcon from "../../icons/chatbubble-outline.svg"
import Card from 'react-bootstrap/Card'
export const Messagebox = ({text}) => {
  return (
    <Card>
        <Card.Img src={messageIcon}/>
        <Card.Body>
            <Card.Title>
            </Card.Title>
            <Card.Text >
              {text}
            </Card.Text>
        </Card.Body>
    </Card>
  )
}
