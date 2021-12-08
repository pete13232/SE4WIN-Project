import { Form, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useContext } from "react";
import { LOGIN_USER } from "../../Graphql/Mutations";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../context/auth";
import * as yup from "yup";
import NavbarBootstrap from "../../components/NavbarBoostrap";
import Swal from "sweetalert2";

const LoginContainer = () => {
  const context = useContext(AuthContext); // Authentication context
  const [login] = useMutation(LOGIN_USER, {
    //login mutation
    update(_, { data: userData }) {
      context.login(userData);
    },
  });

  const loginUser = (data) => {
    //login function
    login({
      //login user and get token from graphQl
      variables: { input: data },
    })
      .then(() => {
        //if login success
        Swal.fire({
          title: "Login success!",
          html: "Press Ok to home page",
          icon: "success",
          allowOutsideClick: false,
          allowEscapeKey: false,
          didClose: () => {
            window.location.replace("/");
          },
        });
      })
      .catch((error) => {
        //if login fail
        const err = error.message;
        Swal.fire({
          title: "Oops! !",
          html: err,
          icon: "error",
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      });
  };

  const schema = yup.object().shape({
    //form schema
    email: yup.string().required("Please enter your email"),
    password: yup.string().required("Please enter your password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    //form variables
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    //submit function
    const param = {
      //create login parameter
      email: data.email,
      password: data.password,
    };

    loginUser(param); //login with parameter
  };

  return (
    <>
      <NavbarBootstrap secondTheme={true} page={"Log-in"} />
      <Row className="bg-signup mx-0 justify-content-center">
        <Col md={4} className="form bg-light my-5">
          <div className="border-bottom border-dark py-3 mb-3">
            <h6 className="m-0">Log-in</h6>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                {...register("email")}
                type="email"
                placeholder="Enter email"
              />
              <p className="errorMessage"> {errors["email"]?.message}</p>
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                {...register("password")}
                type="password"
                placeholder="Enter password"
              />
              <p className="errorMessage"> {errors["password"]?.message}</p>
            </Form.Group>

            <Button type="submit" className="mt-4">
              <h4 style={{ color: "white" }}>Log-in</h4>
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
    </>
  );
};

export default LoginContainer;
