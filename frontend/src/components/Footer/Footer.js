import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import { NavDropdown, Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
//import './Footer.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
export const Footer = () =>{
    

      return (
        <>
        <Row className="my-2">
        <Navbar bg="light" data-bs-theme="light">
          <Container >
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        </Row>
      </>
      );
}