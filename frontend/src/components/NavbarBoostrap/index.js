import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavDropdown,
  Nav,
  Col,
  Form,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs";
import { AuthContext } from "../../context/auth";
import { FaSearch } from "react-icons/fa";
import "./style.css";

const NavbarBootstrap = ({ secondTheme, page }) => {
  const context = useContext(AuthContext);
  const navbarSwitch = () => {
    if (secondTheme) {
      return (
        <Navbar collapseOnSelect expand="lg" className="NavbarB">
          <Col className="d-flex justify-content-center " md={3}>
            <Navbar.Brand className="px-3 d-flex justify-content-center">
              <Link to="/">
                <div className="logo">
                  <h1>FAPP</h1>
                </div>
              </Link>
            </Navbar.Brand>
            <Navbar.Brand>
              <div className="text">
                <h1>{page}</h1>
              </div>
            </Navbar.Brand>
          </Col>
        </Navbar>
      );
    } else if (context.user === null) {
      return (
        <Navbar collapseOnSelect expand="lg" className="NavbarA">
          <Col md={2}>
            <Navbar.Brand className="px-3 d-flex justify-content-center">
              <Link to="/">
                <h1>FAPP</h1>
              </Link>
            </Navbar.Brand>
          </Col>
          <Col md={7}>
            <Form className="search-bar">
              <InputGroup>
                <FormControl
                  type="search"
                  placeholder="Search for product"
                  aria-label="Search"
                />
                <Button variant="light">
                  <FaSearch style={{ color: "black" }} />
                </Button>
              </InputGroup>
            </Form>
          </Col>

          <Col md={1} className="d-flex justify-content-center">
            <Link to="/">
              <h2>Home</h2>
            </Link>
          </Col>
          <Col md={1} className="d-flex justify-content-center">
            <Link to="/signup">
              <h2>Sign-up</h2>
            </Link>
          </Col>
          <Col md={1} className="d-flex justify-content-center">
            <Link to="/login">
              <h2>Log-in</h2>
            </Link>
          </Col>
        </Navbar>
      );
    } else if (context.user.role === "customer") {
      return (
        <Navbar collapseOnSelect expand="lg" className="NavbarA">
          <Col md={2}>
            <Navbar.Brand className="px-3 d-flex justify-content-center">
              <Link to="/">
                <h1>FAPP</h1>
              </Link>
            </Navbar.Brand>
          </Col>
          <Col md={7}>
            <Form className="search-bar">
              <InputGroup>
                <FormControl
                  type="search"
                  placeholder="Search for product"
                  aria-label="Search"
                />
                <Button variant="light">
                  <FaSearch style={{ color: "black" }} />
                </Button>
              </InputGroup>
            </Form>
          </Col>
          <Col md={1} className="d-flex justify-content-center">
            <Link to="/">
              <h2>Home</h2>
            </Link>
          </Col>
          <Col md={1} className="d-flex justify-content-center">
            <Link to="/order">
              <h2>Order</h2>
            </Link>
          </Col>
          <Col md={1} className="d-flex justify-content-center">

            <Nav className=" align-items-baseline">
              <BsPersonCircle />
              <NavDropdown title="User" menuVariant="light">
                <NavDropdown.Item>
                  <Link to="/profile">View Profile</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/" onClick={context.logout}>
                    Log out
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Col>
        </Navbar>
      );
    } else if (context.user?.role === "admin") {
      return (
        <Navbar collapseOnSelect expand="lg" className="NavbarA">
          <Col md={2}>
            <Navbar.Brand className="px-3 d-flex justify-content-center">
              <Link to="/">
                <h1>FAPP</h1>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-dark-example" />
          </Col>
          <Col md={9}></Col>
          <Col md={1} className="d-flex justify-content-center">
            <Navbar.Collapse>
              <Nav className=" align-items-baseline">
                <BsPersonCircle />
                <NavDropdown title="Admin" menuVariant="light">
                  <NavDropdown.Item>
                    <Link to="/" onClick={context.logout}>
                      Log out
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Navbar>
      );
    }
  };
  return <>{navbarSwitch()}</>;
};

export default NavbarBootstrap;
