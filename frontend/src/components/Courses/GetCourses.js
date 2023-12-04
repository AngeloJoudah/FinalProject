import { Container, Row, Col } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { SpinnerLoader } from '../misc/Spinner.js'
import {CourseCard} from './CourseCard.js'

export const Courses = () =>{
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        response()
      }, []);
    const response = async() => {
        await axios.get(`https://localhost:8081/api/v2/users/${localStorage.getItem('_id')}/courses`)
        .then(response =>{
            setData(response.data.courses)
            setIsLoading(false)
        })
        .catch(err=>{
          console.log(err)
            setData([])
            setIsLoading(false)
        })
    }
    const [isHovered,setIsHovered] = useState(false)
    const setHovered = () =>{
        setIsHovered(!isHovered)
    }
    const courses = data ? 
    data.map(course => { return (
        <Col onMouseEnter={setHovered} onMouseLeave={setHovered}  className={`m-5 ${isHovered ? `` : `d-flex`}`} key={course.name} lg={3} md={6} sm={12}>
            <CourseCard image={course.image} name={course.name} description={course.description} courseId={course._id}/>
        </Col>)}) : <></>
    return (<Container fluid>
        <Row>
        {isLoading?<SpinnerLoader/>:courses}
        </Row>
        </Container>
        )
}