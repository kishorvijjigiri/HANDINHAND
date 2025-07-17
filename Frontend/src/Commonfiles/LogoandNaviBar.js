import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "./LogoandNaviBar.css";

function LogoandNaviBar() {
  return (
    <>
      {/* Navbar */}
      <Navbar bg="light" expand="lg" fixed="top" className="navMain" >
        <Container>
          {/* Logo Section */}
          <Navbar.Brand as={Link} to="/" style={{padding:"0px"}}>
            <img
              src={logo}
              alt="Y-MART Logo"
              className="logo-img"
              style={{ height: "70px" }}
            />
          </Navbar.Brand>

          {/* Navbar Toggle for Mobile View */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Navigation Links */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/searchdonar">
                Search Donors
              </Nav.Link>
              <Nav.Link as={Link} to="/donateblood">
                Donate Blood
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About Us
              </Nav.Link>
              <Nav.Link as={Link} to="/gallery">
                Gallery
              </Nav.Link>
              <Nav.Link as={Link} to="/bloodtype">
                Suitable Blood Type
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Page Content */}
      {/* <div style={{ marginTop: "70px" }}>
        
        <h1>Welcome to Y-MART</h1>
        <p>This is your page content starting below the navbar.</p>
      </div> */}
    </>
  );
}

export default LogoandNaviBar;
