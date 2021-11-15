import NavbarBootstrap from "../../components/NavbarBoostrap";
import Header from "../../components/Header";
import { Row, Col, Button, Image } from "react-bootstrap";
import "./style.css";

const Profile = () => {
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
    </div>
  );
};
export default Profile;
