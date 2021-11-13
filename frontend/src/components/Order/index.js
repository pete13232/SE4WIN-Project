import { Row, Col, Button, Image } from "react-bootstrap";
import ButtonCustom from "../ButtonCustom";
import "./style.css";

const Order = () => {
  return (
    <div>
      <Row className="d-flex mt-3 bg-white order-container gx-0">
        <Col md={4} className="d-flex justify-content-center order-image">
          <div>
            <Image src="https://wallpaperaccess.com/full/2161330.jpg" />
          </div>
        </Col>
        <Col md={5}>
          <Row className="gap-3">
            <div className="d-flex">
              <div>
                <h5 className="title-block">Product:</h5>
              </div>
              <div>
                <h3>
                  Keychron K3 Ultra-slim Wireless Mechanical Keyboard (Version
                  2)
                </h3>
              </div>
            </div>
            <div className="d-flex">
              <div>
                <h5 className="title-block">Quantity:</h5>
              </div>
              <div>
                <h5 className="quantity-background">3</h5>
              </div>
            </div>
            <div className="d-flex">
              <div>
                <h5 className="title-block">TotalPrice:</h5>
              </div>
              <div>
                <h5 className="total-background">$138</h5>
              </div>
            </div>
            <div className="d-flex">
              <div>
                <h5 className="title-block">Delivery address:</h5>
              </div>
              <div>
                <h3 className="address-background">
                  126 Pracha Uthit Rd., Bang Mod, Thung Khru, Bangkok 10140,
                  Thailand. 126 Pracha Uthit Rd., Bang Mod, Thung Khru, Bangkok
                  10140, Thailand.
                </h3>
              </div>
            </div>
          </Row>
        </Col>
        <Col md={2}>
          <div className="d-flex gap-3 mb-2">
            <h3>Status:</h3>
            <h6 style={{color:"#ff6600"}}>have not paid</h6>
          </div>
          <Button className="btn-medium blue">Upload receipt</Button>
        </Col>
      </Row>
    </div>
  );
};
export default Order;
