import { useContext } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { Navbar, Col, Form, Button, FormControl } from "react-bootstrap";
import { AuthContext } from "../../context/auth";
import "./style.css";
import { boolean } from "yup/lib/locale";

const NavbarBootstrap = ({ secondTheme, page }) => {
  const context = useContext(AuthContext);

  return (
    <>
      {secondTheme ? (
        <Navbar collapseOnSelect expand="lg" className="NavbarB">
          <Col className="d-flex justify-content-center " md={3}>
            <Navbar.Brand className="px-3 d-flex justify-content-center">
              <Link to="/">
                <h1>FAPP</h1>
              </Link>
            </Navbar.Brand>
            <div className="vl"></div>
            <Navbar.Brand>
              <h1 style={{ color: "black" }}>{page}</h1>
            </Navbar.Brand>
          </Col>
        </Navbar>
      ) : (
        <Navbar collapseOnSelect expand="lg" className="NavbarA">
          <Col md={2}>
            <Navbar.Brand className="px-3 d-flex justify-content-center">
              <Link to="/">
                <h1>FAPP</h1>
              </Link>
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
            <Link to="/">
              <h2>Home</h2>
            </Link>
          </Col>
          <Col md={1} className="d-flex justify-content-center">
            {context.user === null ? (
              <Link to="/signup">
                <h2>Sign-up</h2>
              </Link>
            ) : (
              <Link to="/order">
                <h2>Order</h2>
              </Link>
            )}
          </Col>
          <Col md={1} className="d-flex justify-content-center">
            {context.user === null ? (
              <Link to="/login">
                <h2>Log-in</h2>
              </Link>
            ) : (
              <Link to="/" onClick={context.logout}>
                <h2>Logout</h2>
              </Link>
            )}
          </Col>
        </Navbar>
      )}
    </>
  );
};

export default NavbarBootstrap;
