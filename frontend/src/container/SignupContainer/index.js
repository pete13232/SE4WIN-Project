import { useMutation } from "@apollo/client";
import { Col, Row, Form, FloatingLabel, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import NavbarBootstrap from "../../components/NavbarBoostrap";
import { CREATE_USER } from "../../Graphql/Mutations";
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import "./style.css";

const SignupContainer = () => {
  const [createUser, { error }] = useMutation(CREATE_USER);

  const [username, setUsername] = useState("pete");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");


  const addUser =  (data) => {
     console.log(data)
     createUser({
      variables: {
        username: data.username,
        password: data.password,
        firstname: data.phoneNumberfirstname,
        lastname: data.lastname,
        address:data.address,
        phoneNumber: data.phone,
        email: email,
      },
    });
    if (error) {
       alert(`Something wrong! \n ${error} \n Please try again `);
    }
  };

  const personalFormList = {
    inputs: [
      {
        label: "Email",
        name: "email",
        type: "email",
        placeholder: "Enter email",
      },
      {
        label: "Password",
        name: "password",
        type: "password",
        placeholder: "Enter password",
      },
      {
        label: "First name",
        name: "firstname",
        type: "text",
        placeholder: "Enter first name",
      },
      {
        label: "Last name",
        name: "lastname",
        type: "text",
        placeholder: "Enter last name",
      },
    ],
  };

  const contactFormList = {
    inputs: [
      {
        label: "Phone",
        name: "phone",
        type: "number",
        placeholder: "Enter phone",
      },
      {
        label: "Address",
        name: "address",
        type: "text",
        placeholder: "Enter address",
      },
    ],
  };

  const schema = yup.object().shape({
      email: yup.string().required("Please enter your email"),
      password: yup.string().required("Please enter your password").min(7),
      firstname: yup.string().required("Please enter your first name"),
      lastname: yup.string().required("Please enter your last name"),
      phone: yup.string().required("Please enter phone number"),
      address: yup.string().required("Please enter your address"),
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    addUser(data)
    
  }


  return (
    <>
      <div>
        <NavbarBootstrap />
        <Row className="bg-signup mx-0 justify-content-center">
          <Col md={4} className="form bg-light my-5">
            <div className="border-bottom border-dark py-3 mb-3">
              <h6 className="m-0">Sign-up</h6>
            </div>

            <Form onSubmit= {handleSubmit(onSubmit)}> 
              <Form.Label className="fw-bold">Personal Information</Form.Label>
              {personalFormList.inputs.map((input, key) => {
                return (
                  <Form.Group className="mb-1" key={key}>
                    <Form.Label>{input.label}</Form.Label>
                    <Form.Control
                      name={input.name}
                      type={input.type}
                      placeholder={input.placeholder}
                      {...register( input.name )}
                    />
                    <p className = "errorMessage"> { errors[input.name]?.message }</p>
                  </Form.Group>
                );
              })}
              <Form.Group className="mb-1" controlId="formBasicEmail">
                <Form.Label>{ contactFormList.inputs[0].label }</Form.Label>
                <Form.Control
                  name={ contactFormList.inputs[0].name }
                  type={ contactFormList.inputs[0].type }
                  placeholder={ contactFormList.inputs[0].placeholder }
                  {...register( contactFormList.inputs[0].name )}
                />
                <p className = "errorMessage" > { errors[contactFormList.inputs[0].name]?.message }</p>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>{ contactFormList.inputs[1].label }</Form.Label>
                <Form.Control
                  className="mb-1"
                  name={ contactFormList.inputs[1].name }
                  type={ contactFormList.inputs[1].type }
                  placeholder={ contactFormList.inputs[1].placeholder }
                  {...register( contactFormList.inputs[1].name )}
                />
                <p className = "errorMessage" > { errors[contactFormList.inputs[1].name]?.message }</p>
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
    </>
  );
};

export default SignupContainer;
