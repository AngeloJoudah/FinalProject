import React from "react";
import { Courses } from "../../components/Courses/GetCourses";
import { Container, Button, Row } from "react-bootstrap";
import { Template } from "../shared/template";
export const CourseList = () =>{
    return(
        <Template>
        <Row style={{textAlign:"center"}} className="Home">
         <h1>
              Welcome, {localStorage.getItem("user")}!
         </h1>
        </Row>
        <h1>
            Courses:
        </h1>
        <Container className="d-flex">
        <Courses/>
        </Container>
        {localStorage.getItem("type") === "TEACHER" ? <Button className="m-3" href="/courses/add">Add a course</Button> : null}   
        </Template>
    );
}