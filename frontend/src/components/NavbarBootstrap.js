import { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import {
  Navbar,
  Container,
  Col,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

const NavbarBootstrap = ({ themeStatus }) => {
  return (
    <>
      {themeStatus ? (
        <Navbar collapseOnSelect expand="lg" className="NavbarB">
          <Col md={2}>
            <Navbar.Brand className="px-3 d-flex justify-content-center ">
              <h1 style={{color: "#ff6600"}}>FAPP</h1>
            </Navbar.Brand>
          </Col>
          <Col>
            <div className="vl"></div>
          </Col>

          {/* <Col md={7}>
        <Form>
          <FormControl
            type="search"
            placeholder="Search for product"
            className="me-2"
            aria-label="Search"
          />
          { <Button variant="outline-success">Search</Button> }
        </Form>
      </Col>
      <Col md={1} className="d-flex justify-content-center">
        <a href="/">
          <h2>Home</h2>
        </a>
      </Col>
      <Col md={1} className="d-flex justify-content-center">
        <a href="/signup" >
          <h2>Sign-up</h2>
        </a>
      </Col>
      <Col md={1} className="d-flex justify-content-center">
        <a href="/login">
          <h2>Log-in</h2>
        </a>
      </Col> */}
        </Navbar>
      ) : (
        <Navbar collapseOnSelect expand="lg" className="NavbarA">
          <Col md={2}>
            <Navbar.Brand className="px-3 d-flex justify-content-center">
              <h1>FAPP</h1>
            </Navbar.Brand>
          </Col>
          <Col md={7}>
            <Form>
              <FormControl
                type="search"
                placeholder="Search for product"
                className="me-2"
                aria-label="Search"
              />
              {/* <Button variant="outline-success">Search</Button> */}
            </Form>
          </Col>
          <Col md={1} className="d-flex justify-content-center">
            <a href="/">
              <h2>Home</h2>
            </a>
          </Col>
          <Col md={1} className="d-flex justify-content-center">
            <a href="/signup">
              <h2>Sign-up</h2>
            </a>
          </Col>
          <Col md={1} className="d-flex justify-content-center">
            <a href="/login">
              <h2>Log-in</h2>
            </a>
          </Col>
        </Navbar>
      )}
    </>
  );
};

export default NavbarBootstrap;