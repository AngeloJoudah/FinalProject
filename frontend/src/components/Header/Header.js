import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import { NavDropdown, Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row , Col} from "react-bootstrap";
//import './Header.css'
export const Header = () =>{

    return(
        
        <Row className="Header">
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/">Final Project</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/courses">Courses</Nav.Link>
              <Nav.Link href="/grades">Home</Nav.Link>
              <Nav.Link href="/messages">Messages</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <br />
        </Row>
    );
}