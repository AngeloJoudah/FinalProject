import React from "react";
import { Courses } from "../../components/Courses/GetCourses";
import { Row, Container, Button } from "react-bootstrap";

export const CourseList = () =>{
    return(
        <Container >
        <Row>
            Courses
        </Row>
        <Container className="d-flex">
        <Courses url={'http://localhost:8081/api/v2/courses'}/>
        </Container>
        <Button className="m-3" href="/courses/add">Add a course</Button>
        </Container>
    );
}