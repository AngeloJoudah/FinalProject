import { Container, Row, Col } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { SpinnerLoader } from '../misc/Spinner.js'
import {CourseCard} from './CourseCard.js'

export const Courses = ({url}) =>{
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        response()
      }, []);
    const response = async() => {
        await axios.get(url)
        .then(response =>{
            setData(response.data)
            setIsLoading(false)
        })
        .catch(err=>{
          console.log(err)
            setData([])
            setIsLoading(false)
        })
    }
    const courses = data.map(course => {
        return(
        <Col  className='m-5 d-flex' key={course.name} lg={3} md={6} sm={12}>
            <CourseCard image={course.image} name={course.name} description={course.description}/>
        </Col>)});
    return (<Container fluid>
        <Row>
        {isLoading?<SpinnerLoader/>:courses}
        </Row>
        </Container>
        )
}
