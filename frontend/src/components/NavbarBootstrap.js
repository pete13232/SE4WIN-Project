import { Navbar, Container, Col } from "react-bootstrap";


const NavbarBootstrap = () => {
  return (
    <Container>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Col xs={2}>
          <Container>
            <Navbar.Brand href="#home">FAPP</Navbar.Brand>
          </Container>
        </Col>
      </Navbar>
    </Container>
  );
};

export default NavbarBootstrap;
