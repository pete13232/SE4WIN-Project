import { useMutation } from "@apollo/client";
import { Col, Row, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CREATE_USER } from "../../Graphql/Mutations";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import NavbarBootstrap from "../../components/NavbarBoostrap";
import InputMask from "react-input-mask";
import Swal from "sweetalert2";
import "./style.css";

const SignupContainer = () => {
  const [createUser] = useMutation(CREATE_USER);

  const addUser = (data) => {
    createUser({
      variables: { input: data },
    })
      .then(() => {
        Swal.fire({
          title: "Sign up success!",
          html: "Press Ok to login page",
          icon: "success",
          allowOutsideClick: false,
          allowEscapeKey: false,
          didClose: () => {
            window.location.replace("/login");
          },
        });
      })
      .catch((error) => {
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
        label: "Confirm password",
        name: "ConfirmPassword",
        type: "password",
        placeholder: "Enter confirm password",
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
        name: "phoneNumber",
        type: "tel",
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
    password: yup
      .string()
      .required("Please enter your password")
      .min(7, "Please enter at least 7 characters password"),
    ConfirmPassword: yup
      .string()
      .required("Please enter your password"),
    firstname: yup.string().required("Please enter your first name"),
    lastname: yup.string().required("Please enter your last name"),
    phoneNumber: yup
      .string()
      .required("Please enter your phone number")
      .min(12, "Please enter valid phone number")
      .max(12, "Please enter valid phone number"),
    address: yup.string().required("Please enter your address"),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if(data.ConfirmPassword === data.password)
    {
      const param = {
      email: data.email,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname,
      address: data.address,
      phoneNumber: data.phoneNumber.replaceAll("-", ""),
      role: "CUSTOMER",
    };
      addUser(param);
    }else{
      Swal.fire({
        title: "Password and Confirm password is not the same",
        html: "Press OK to continue",
        icon: "error",
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    }
    
  };

  const [valuePhone, setvaluePhone] = useState("");

  const beforeMaskedValueChange = (newState, oldState, userInput) => {
    var { value } = newState;
    var selection = newState.selection;
    var cursorPosition = selection ? selection.start : null;

    // keep minus if entered by user
    if (value.endsWith("-") && userInput !== "-" && !valuePhone.endsWith("-")) {
      if (cursorPosition === value.length) {
        cursorPosition--;
        selection = { start: cursorPosition, end: cursorPosition };
      }
      value = value.slice(0, -1);
    }

    return {
      value,
      selection,
    };
  };

  return (
    <>
      <div>
        <NavbarBootstrap secondTheme={true} page={"Sign-up"} />
        <Row className="bg-signup mx-0 justify-content-center">
          <Col md={4} className="form bg-light my-5">
            <div className="border-bottom border-dark py-3 mb-3">
              <h6 className="m-0">Sign-up</h6>
            </div>

            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Label className="fw-bold">Personal Information</Form.Label>
              {personalFormList.inputs.map((input, key) => {
                return (
                  <Form.Group className="mb-1" key={key}>
                    <Form.Label>{input.label}</Form.Label>
                    <Form.Control
                      name={input.name}
                      type={input.type}
                      placeholder={input.placeholder}
                      {...register(input.name)}
                    />
                    <p className="errorMessage">
                      {" "}
                      {errors[input.name]?.message}
                    </p>
                  </Form.Group>
                );
              })}
              <Form.Group className="mb-1">
                <Form.Label>{contactFormList.inputs[0].label}</Form.Label>
                <Controller
                  name={contactFormList.inputs[0].name}
                  control={control}
                  render={({ field }) => (
                    <InputMask
                      mask="099-999-9999"
                      maskChar={null}
                      value={valuePhone}
                      onChange={(e) => {
                        setvaluePhone(e.target.value);
                        field.onChange(e);
                      }}
                      beforeMaskedValueChange={beforeMaskedValueChange}
                    >
                      {(...inputProps) => (
                        <Form.Control
                          {...inputProps}
                          className="mb-1"
                          type={contactFormList.inputs[0].type}
                          placeholder={contactFormList.inputs[0].placeholder}
                        />
                      )}
                    </InputMask>
                  )}
                />

                <p className="errorMessage">
                  {" "}
                  {errors[contactFormList.inputs[0].name]?.message}
                </p>
              </Form.Group>
              <Form.Group>
                <Form.Label>{contactFormList.inputs[1].label}</Form.Label>
                <Form.Control
                  className="mb-1"
                  name={contactFormList.inputs[1].name}
                  type={contactFormList.inputs[1].type}
                  placeholder={contactFormList.inputs[1].placeholder}
                  {...register(contactFormList.inputs[1].name)}
                />
                <p className="errorMessage">
                  {" "}
                  {errors[contactFormList.inputs[1].name]?.message}
                </p>
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
