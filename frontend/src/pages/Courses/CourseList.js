import React from "react";
import { Courses } from "../../components/Courses/GetCourses";
import { Container, Button } from "react-bootstrap";
import { Template } from "../shared/template";

export const CourseList = () =>{
    return(
        <Template>
        <h1>
            Courses
        </h1>
        <Container className="d-flex">
        <Courses/>
        </Container>
        <Button className="m-3" href="/courses/add">Add a course</Button>
        </Template>
    );
}