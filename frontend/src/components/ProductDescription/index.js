import { Row, Col } from "react-bootstrap";
import "./style.css";

const ProductDescription = () => {
  return (
    <div>
      <Row className="mt-3 bg-white description">
        <Col md={1}>
          <h4 className="text-end mt-4">Category:</h4>
          <h4 className="text-end mt-3">Detail:</h4>
        </Col>
        <Col md={11}>
          <h4 className="mt-4">Keyboard</h4>
          <h4 className="mt-3 pe-4">
            Keychron K3 Ultra-slim Wireless Bluetooth Mechanical Keyboard
            version 2 has included keycaps for both Windows and macOS, and users
            can hot-swap every switch in seconds with the hot-swappable version.
            Please drop your email on "Notify Me When Available" if the product
            model is out of stock.
          </h4>
        </Col>
      </Row>
    </div>
  );
};
export default ProductDescription;
