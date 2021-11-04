import {
    Col,
    Row,
    Card,
  } from "react-bootstrap";

import "./style.css";
const Product = ({ name, price, img }) => {

    
  return (
    <>
          <Col md={3}>
            <Card>
              <Card.Body style={{ padding: 0 }}>
                <div className="product-background">
                  <Card.Img
                    variant="top"
                    src= { img }
                  />
                </div>
                <br />
                <Card.Title className="product-name">
                  { name }
                </Card.Title>
                <Card.Title className="price mt-5 pe-3">{ price }</Card.Title>
                {/* <Card.Link href="##" target="_blank">
                  <Button variant="warning">Read more</Button>
                </Card.Link> */}
              </Card.Body>
            </Card>
          </Col>
    </>
  );
};

export default Product;
