import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import './Home.css'


export const Home = () =>{
    return(
        <>
        <Row className="Home">
         <h1>
              Welcome, User!
         </h1>
        </Row>
        <Row>
            <p>Your Enrolled Courses</p>
        </Row>
        <Row>
            <Col>

            </Col>
        </Row>
        </>
    )
}