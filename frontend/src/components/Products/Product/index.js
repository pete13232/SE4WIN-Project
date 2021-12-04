import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./style.css";
const Product = ({ name, price, img, id }) => {
  return (
    <>
      <Col md={3} className="mb-3 product">
        <Link to={`products/${id}`}>
          <Card>
            <Card.Body style={{ padding: 0 }}>
              <div className="product-background">
                <Card.Img variant="top" src={img} />
              </div>
              <br />
              <Card.Title className="product-name">{name}</Card.Title>
              <Card.Title className="price mt-5 pe-3">{price}</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    </>
  );
};

export default Product;
