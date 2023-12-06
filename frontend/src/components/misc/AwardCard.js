import React from 'react'
import { Card } from 'react-bootstrap'

export const AwardCard = ({title, read,instructor, className, image, fileType, time, onClick}) => {
    
    return (
        <Card className='col-lg-3 col-md-5 col-sm-8 col-xs-12 offset-md-1 offset-sm-2' onClick={onClick}>
            {read ? null : <h1></h1>}
            <Card.Header>
                <Card.Title>
                    <h5 style={{textOverflow:'ellipsis',overflow:'hidden',whiteSpace:'nowrap'}}>{title}</h5>
                </Card.Title>
            </Card.Header>
            <Card.Body >
                <Card.Img src={`data:${fileType};base64,${image}`} className='col-5'/>
                <Card.Text style={{textAlign:"center"}}>
                    {new Date(time / 1000).toUTCString()}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <h6 style={{textOverflow:'ellipsis',overflow:'hidden',whiteSpace:'nowrap'}}>Instructor: {instructor}</h6>
            </Card.Footer>
        </Card>
    )
}
