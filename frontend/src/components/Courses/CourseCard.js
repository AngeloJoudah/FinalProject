import Card from 'react-bootstrap/Card'
import {Button } from 'react-bootstrap'

export const CourseCard = ({image, name, description}) =>{
    return(
        <Card className='flex-shrink-1' >
        <Card.Img variant="top" src={image} />
        <Card.Header>
            {name}
          </Card.Header>
          <Card.Body>
          <Card.Text>
            {description}
          </Card.Text>
          <Button variant="primary">Visit</Button>
        </Card.Body>
      </Card>
    );
}