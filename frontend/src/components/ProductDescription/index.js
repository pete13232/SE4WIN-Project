import { Row, Col } from "react-bootstrap";
import "./style.css";

const ProductDescription = ({ category, desc }) => {
  return (
    <div>
      <Row className="mt-3 bg-white description">
        <Col md={1}>
          <h4 className="text-end mt-4">Category:</h4>
          <h4 className="text-end mt-3">Detail:</h4>
        </Col>
        <Col md={11}>
          <h4 className="mt-4">{category}</h4>
          <h4 className="mt-3 pe-4">{desc}</h4>
        </Col>
      </Row>
    </div>
  );
};
export default ProductDescription;
