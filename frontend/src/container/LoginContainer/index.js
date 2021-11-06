import NavbarBootstrap from "../../components/NavbarBoostrap";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const LoginContainer = () => {
  return (
    <div>
      <NavbarBootstrap />
      <Row className="bg-signup mx-0 justify-content-center">
        <Col md={4} className="form bg-light my-5">
          <div className="border-bottom border-dark py-3 mb-3">
            <h6 className="m-0">Log-in</h6>
          </div>
          <Form>
            {/* <Form.Label className="fw-bold">Personal Information</Form.Label> */}
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>

            <Button type="submit" className="mt-4">
              <h5>Sign-up</h5>
            </Button>
            <div className="alternative mt-2">
              <h4>
                Do you new here?
                <Link to="/signup" className="ms-1">
                  sign-up
                </Link>
              </h4>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default LoginContainer;
