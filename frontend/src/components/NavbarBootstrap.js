import {
  Navbar,
  Container,
  Col,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

const NavbarBootstrap = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="Navbar">
      <Col md={2}>
        <Navbar.Brand
          href="#home"
          className="px-3 d-flex justify-content-center"
        >
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
        <a href="#">
          <h2>Home</h2>
        </a>
      </Col>
      <Col md={1} className="d-flex justify-content-center">
        <a href="#">
          <h2>Sign-up</h2>
        </a>
      </Col>
      <Col md={1} className="d-flex justify-content-center">
        <a href="#">
          <h2>Log-in</h2>
        </a>
      </Col>
    </Navbar>

    // <Container className="mx-0 test">
    //     <h1>Pete</h1>
    //     <h1>Pete</h1>
    //     <h1>Pete</h1>
    // </Container>
  );
};

export default NavbarBootstrap;
