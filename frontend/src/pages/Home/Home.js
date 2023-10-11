import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import './Home.css'
import { Template } from "../shared/template";


export const Home = () =>{
    return(
        <Template>
        <Row className="Home">
         <h1>
              Welcome, {localStorage.get("username")}!
         </h1>
        </Row>
        <Row>
            <p>Your Enrolled Courses</p>
        </Row>
        <Row>
            <Col>

            </Col>
        </Row>
        </Template>
    )
}