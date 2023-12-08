import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";

export const Header = () =>{

    return(
        
        <Row className="Header" style={{fontSize:"3vw"}}>
        <Navbar bg="light" data-bs-theme="light">
          <Container fluid>
            <Navbar.Brand href="/" style={{fontSize:"3vw"}} className="mr-5">OfCourse</Navbar.Brand>
            <Nav className="me-auto ml-5">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/zoom">Zoom</Nav.Link>
              <Nav.Link href="/chats">Chats</Nav.Link>
              {localStorage.getItem('type')==='STUDENT' ? <Nav.Link href="/register">Register</Nav.Link> : null}
            </Nav>
          </Container>
        </Navbar>
        <br />
        </Row>
    );
}