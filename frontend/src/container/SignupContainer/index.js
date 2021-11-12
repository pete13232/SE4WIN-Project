import { useMutation } from "@apollo/client";
import { Col, Row, Form, FloatingLabel, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import NavbarBootstrap from "../../components/NavbarBoostrap";
import { CREATE_USER } from "../../Graphql/Mutations";
import "./style.css";

const SignupContainer = () => {

  const [createUser, { error }] = useMutation(CREATE_USER)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [address, setAddress] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")


  const addUser = () => {
    
    createUser({
      variables: 
      {
          username:  username,
          password: password,
          firstname: firstname,
          lastname: lastname,
          address: address,
          phoneNumber: phoneNumber,
          email: email,
      }
    })
    if (error){
      console.log(error)
    }
  }



  return (
    <div>
      <NavbarBootstrap />
      <Row className="bg-signup mx-0 justify-content-center">
        <Col md={4} className="form bg-light my-5">
          <div className="border-bottom border-dark py-3 mb-3">
            <h6 className="m-0">Sign-up</h6>
          </div>
          <Form>
            <Form.Label className="fw-bold">Personal Information</Form.Label>
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
              type="email" 
              placeholder="Enter email" 
              onChange = {(e) => {
                setEmail(e.target.value)
              }}/>
            </Form.Group>
            <Form.Group className="mb-1" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
              type="password" 
              placeholder="Enter password"
              onChange = {(e) => {
                setPassword(e.target.value)
              }} />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicFirstname">
              <Form.Label>First name</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Enter first name" 
              onChange = {(e) => {
                setFirstname(e.target.value)
              }}/>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicLastname">
              <Form.Label>Last name</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Enter last name"
              onChange = {(e) => {
                setLastname(e.target.value)
              }} />
            </Form.Group>
            <Form.Label className="fw-bold">Contact Information</Form.Label>
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Label>Phone</Form.Label>
              <Form.Control 
              type="tel" 
              placeholder="Enter phone number"
              onChange = {(e) => {
                setPhoneNumber(e.target.value)
              }} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Address</Form.Label>
              <Form.Control
                className="mb-1"
                type="text"
                placeholder="Enter address"
                onChange = {(e) => {
                  setAddress(e.target.value)
                }}
              />
            </Form.Group>

            <Button type="submit" className="mt-4" onClick = { addUser }>
              <h4 style={{color:"white"}}>Sign-up</h4>
            </Button>
            <div className="alternative mt-2">
              <h4>
                already have account?
                <Link to="/login" className="ms-1">
                  login
                </Link>
              </h4>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default SignupContainer;
