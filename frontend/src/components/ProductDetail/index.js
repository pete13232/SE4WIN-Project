import { Row, Col, Button, Image } from "react-bootstrap";
import "./style.css";
import ProductModal from "../Modal/ProductModal";

const ProductDetail = ({ picURL, name, price, stock }) => {
  return (
    <div>
      <Row className="detail mt-3">
        <Col md={5} className="pe-0 border-end border-2">
          <div className="background-head">
            <Image src={ picURL } />
          </div>
        </Col>
        <Col md={7} className="ps-0 bg-white">
          <Row className="detail-head g-0">
            <h6 className="ps-4 d-flex align-items-center">
              { name }
            </h6>
          </Row>
          <Row className="ps-5 pt-4 gap-4">
            <div className="d-flex align-items-center">
              <div className="detail-block d-flex align-items-center justify-content-end">
                <h5>Price:</h5>
              </div>
              <div className="ms-4 d-flex align-items-center justify-content-center background-detail">
                <h5>{ price } ฿</h5>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="detail-block d-flex align-items-center justify-content-end">
                <div className="text-end">
                  <h5>Quantity:</h5>
                  <h4>Stock: {stock}</h4>
                </div>
              </div>
              <div className="ms-4 mb-4 d-flex align-items-center justify-content-center background-detail">
                  <input className="center-block text-center" type="number" placeholder="0" min="0"/>
              </div>
            </div>
            {/* <Button className="ms-4 blue btn btn-success" href="#">Buy</Button> */}
            <ProductModal/>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
export default ProductDetail;
