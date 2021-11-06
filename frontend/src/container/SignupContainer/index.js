import { Col, Row, Form, FloatingLabel, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarBootstrap from "../../components/NavbarBoostrap";
import "./style.css";

const SignupContainer = () => {
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
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicFirstname">
              <Form.Label>First name</Form.Label>
              <Form.Control type="text" placeholder="Enter first name" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicLastname">
              <Form.Label>Last name</Form.Label>
              <Form.Control type="text" placeholder="Enter last name" />
            </Form.Group>
            <Form.Label className="fw-bold">Contact Information</Form.Label>
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="tel" placeholder="Enter phone number" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Address</Form.Label>
              <Form.Control
                className="mb-1"
                type="text"
                placeholder="Enter address"
              />
            </Form.Group>

            <Button type="submit" className="mt-4">
              <h5>Sign-up</h5>
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
