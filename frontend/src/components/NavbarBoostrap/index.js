import { useContext, useEffect, useState } from "react";
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
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useQuery } from "@apollo/client";
import { GET_USER_INFO } from "../../Graphql/Queries";
const NavbarBootstrap = ({
  secondTheme,
  page,
  queryState,
  setQueryState,
  searchName,
  setSearchName,
  resetState,
}) => {
  const context = useContext(AuthContext);

  const { data } = useQuery(GET_USER_INFO);
  const [user, setUser] = useState();

  useEffect(() => {
    if (data) {
      setUser(data.me);
    }
  }, [data]);

  const { register, handleSubmit } = useForm();

  const onSubmit = (submit) => {
    setSearchName(submit.name);
    setQueryState(Number(3));
  };

  const logoutSweetAlert = () => {
    Swal.fire({
      title: "You are logout!",
      html: "Press Ok to continue",
      icon: "info",
    });
  };

  const textCut = () => {
    var text = user?.firstname;
    if (text !== null) {
      if (text?.length > 6) {
        text = text.substring(0, 6);
      }
    }
    return text;
  };

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
              <Link
                to="/"
                onClick={() => {
                  if (resetState) {
                    resetState();
                  }
                }}
              >
                <h1>FAPP</h1>
              </Link>
            </Navbar.Brand>
          </Col>
          <Col md={7}>
            <Form className="search-bar" onSubmit={handleSubmit(onSubmit)}>
              <InputGroup>
                <FormControl
                  type="search"
                  placeholder="Search for product"
                  aria-label="Search"
                  {...register("name")}
                />
                <Button variant="light" type="submit">
                  <FaSearch style={{ color: "black" }} />
                </Button>
              </InputGroup>
            </Form>
          </Col>

          <Col md={1} className="d-flex justify-content-center">
            <Link
              to="/"
              onClick={() => {
                if (resetState) {
                  resetState();
                }
              }}
            >
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
              <Link
                to="/"
                onClick={() => {
                  if (resetState) {
                    resetState();
                  }
                }}
              >
                <h1>FAPP</h1>
              </Link>
            </Navbar.Brand>
          </Col>
          <Col md={7}>
            <Form className="search-bar" onSubmit={handleSubmit(onSubmit)}>
              <InputGroup>
                <FormControl
                  type="search"
                  placeholder="Search for product"
                  aria-label="Search"
                  {...register("name")}
                />
                <Button variant="light">
                  <FaSearch style={{ color: "black" }} />
                </Button>
              </InputGroup>
            </Form>
          </Col>
          <Col md={1} className="d-flex justify-content-center">
            <Link
              to="/"
              onClick={() => {
                if (resetState) {
                  resetState();
                }
              }}
            >
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
              <NavDropdown title={textCut()} menuVariant="light">
                <NavDropdown.Item>
                  <Link to="/profile">View Profile</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link
                    to="/"
                    onClick={() => {
                      context.logout();
                      logoutSweetAlert();
                    }}
                  >
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
                    <Link
                      to="/"
                      onClick={() => {
                        context.logout();
                        logoutSweetAlert();
                      }}
                    >
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
