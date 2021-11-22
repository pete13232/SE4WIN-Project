import NavbarBootstrap from "../../components/NavbarBoostrap";
import Header from "../../components/Header";
import { Row, Col, Button, Image, Form } from "react-bootstrap";
import React, { useState } from "react";
import "./style.css";

const Profile = () => {
  const [edit, setEdit] = useState(true);
  const handleEdit = () => {
    setEdit(false);
  };
  return (
    <div>
      <Row className="d-flex mt-3 bg-white profile-container gx-0">
        <Col md={3} className="d-block justify-content-center profile-image">
          <div className="mb-3">
            <Image src="https://wallpaperaccess.com/full/2161330.jpg" />
          </div>
          <div className="text-center">
            <Button className="btn-medium blue">Edit Profile</Button>
          </div>
        </Col>
        <Col md={3}>
          <Row className="gap-3">
            <div className="d-flex">
              <div>
                <h5 className="title-block">Email:</h5>
              </div>
              <div>
                <h3>pete@hotmail.com</h3>
              </div>
            </div>
            <div className="d-flex">
              <div>
                <h5 className="title-block">Password:</h5>
              </div>
              <div>
                <h3>********</h3>
              </div>
            </div>
            <div className="d-flex">
              <div>
                <h5 className="title-block">First name:</h5>
              </div>
              <div>
                <h3>Pete</h3>
              </div>
            </div>
            <div className="d-flex">
              <div>
                <h5 className="title-block">Last name:</h5>
              </div>
              <div>
                <h3>Vongchanapibul</h3>
              </div>
            </div>
          </Row>
        </Col>
        <Col md={5}>
          <div className="d-flex">
            <div>
              <h5 className="title-block">Phone:</h5>
            </div>
            <div>
              <h3>081-2356322</h3>
            </div>
          </div>
          <div className="d-flex">
            <div>
              <h5 className="title-block">address:</h5>
            </div>
            <div>
              <h3>
                126 Pracha Uthit Rd., Bang Mod, Thung Khru, Bangkok 10140,
                Thailand. 126 Pracha Uthit Rd., Bang Mod, Thung Khru, Bangkok
                10140, Thailand.
              </h3>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="d-flex mt-3 bg-white profile-container gx-0">
        <Col md={3} className="d-block justify-content-center profile-image">
          <div className="mb-3">
            <Image src="https://wallpaperaccess.com/full/2161330.jpg" />
          </div>
          <div className="text-center">
            <Button className="btn-medium blue">Edit Profile</Button>
          </div>
        </Col>
        <Col md={3}>
          <Row className="gap-3">
            <div className="d-flex">
              <div>
                <h5 className="title-block">Email:</h5>
              </div>
              <div>
                <h3 className="edit">pete@hotmail.com</h3>
              </div>
            </div>
            <div className="d-flex">
              <div>
                <h5 className="title-block">Password:</h5>
              </div>
              <div>
                <h3 className="edit">********</h3>
              </div>
            </div>
            <div className="d-flex">
              <div>
                <h5 className="title-block">First name:</h5>
              </div>
              <div>
                <h3 className="edit">Pete</h3>
              </div>
            </div>
            <div className="d-flex">
              <div>
                <h5 className="title-block">Last name:</h5>
              </div>
              <div>
                <h3 className="edit">Vongchanapibul</h3>
              </div>
            </div>
          </Row>
        </Col>
        <Col md={5}>
          <div className="d-flex">
            <div>
              <h5 className="title-block">Phone:</h5>
            </div>
            <div>
              <h3 className="edit">081-2356322</h3>
            </div>
          </div>
          <div className="d-flex">
            <div>
              <h5 className="title-block">address:</h5>
            </div>
            <div>
              <h3 className="edit">
                126 Pracha Uthit Rd., Bang Mod, Thung Khru, Bangkok 10140,
                Thailand. 126 Pracha Uthit Rd., Bang Mod, Thung Khru, Bangkok
                10140, Thailand.
              </h3>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="d-flex mt-3 bg-white profile-container gx-0">
        <Col md={3} className="d-block justify-content-center profile-image">
          <div className="mb-3">
            <Image src="https://wallpaperaccess.com/full/2161330.jpg" />
          </div>
          <div className="text-center">
            <Button className="btn-medium blue" onClick={handleEdit}>
              Edit Profile
            </Button>
          </div>
        </Col>
        <Col md={3}>
          <Row className="gap-3">
            <Form>
              <Form.Group
                className="d-flex mb-3 align-items-baseline"
                controlId="formBasicEmail"
              >
                <Form.Label className="title-block">
                  <h5>Email:</h5>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="pete@hotmail.com"
                  disabled={edit}
                />
              </Form.Group>
              <Form.Group
                className="d-flex mb-3 align-items-baseline"
                controlId="formBasicPassword"
              >
                <Form.Label className="title-block">
                  <h5>Password:</h5>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="*******"
                  disabled={edit}
                />
              </Form.Group>
              <Form.Group
                className="d-flex mb-3 align-items-baseline"
                controlId="formBasicPassword"
              >
                <Form.Label className="title-block">
                  <h5>First name:</h5>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Pete"
                  disabled={edit}
                />
              </Form.Group>
              <Form.Group
                className="d-flex mb-3 align-items-baseline"
                controlId="formBasicPassword"
              >
                <Form.Label className="title-block">
                  <h5>Last name:</h5>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Vongchanapibul"
                  disabled={edit}
                />
              </Form.Group>
            </Form>
          </Row>
        </Col>
        <Col md={5}>
          <Form>
            <Form.Group
              className="d-flex mb-3 align-items-baseline"
              controlId="formBasicEmail"
            >
              <Form.Label className="title-block">
                <h5>Phone:</h5>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="081-2356322"
                disabled={edit}
              />
            </Form.Group>
            <Form.Group
              className="d-flex mb-3 align-items-baseline"
              controlId="formBasicPassword"
            >
              <Form.Label className="title-block">
                <h5>address:</h5>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="126 Pracha Uthit Rd., Bang Mod, Thung Khru, Bangkok 10140,
                Thailand. 126 Pracha Uthit Rd., Bang Mod, Thung Khru, Bangkok
                10140, Thailand."
                as="textarea"
                disabled={edit}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
export default Profile;
