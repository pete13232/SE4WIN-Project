import { Container, Col, Row, Image, Carousel } from "react-bootstrap";
import "./style.css"

const Footer = () => {
  return (
    <div className="footer-line mt-5">
      <Row className="px-3 py-3">
        <Col md={5}>
          <h4>Contact us: 087-xxxxxxx</h4>
        </Col>
        <Col md={7}>
          <h4>FAPP Company Corporation</h4>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
