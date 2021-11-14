import Button from "@restart/ui/esm/Button";
import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import NavbarBootstrap from "../../components/NavbarBoostrap";
import "./style.css";

const EditProfileContainer = () => {
  return (
    <div>
      <NavbarBootstrap themeStatus={false} />
      <div className="space-md header">
        <div className="header px-2">
          <h3>Profile</h3>
        </div>
      </div>
      <div className="bg-white">
        <Row className="detail mt-3">
          <Col md={5} className="text-center">
            <div className="background-head">
              <Image src=" https://as2.ftcdn.net/v2/jpg/02/29/75/83/500_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" />
            </div>
            <Button variant="primary">Edit Profile</Button>
          </Col>
          <Col md={7}>
            <Row className="detail-head g-0">
              <Col>
                <Row>
                  <h3>
                    email: <span>pete@mail.com</span>
                  </h3>
                </Row>
                <Row>
                  <h3>
                    Password: <span>**********</span>
                  </h3>
                </Row>
                <Row>
                  <h3>
                    Firstname: <span>Pete</span>
                  </h3>
                </Row>
                <Row>
                  <h3>
                    Lastname: <span>Vong</span>
                  </h3>
                </Row>
              </Col>
              <Col>
                <Row>
                  <h3>
                    Phone: <span>083-245-9657</span>
                  </h3>
                </Row>
                <Row>
                  <h3>
                    Address:
                    <span>
                      126 Pracha Uthit Rd., Bang Mod, Thung Khru, Bangkok 10140,
                      Thailand.
                    </span>
                  </h3>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default EditProfileContainer;
