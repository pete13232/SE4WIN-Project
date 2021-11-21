import {
  Col,
  Row,
  Card,
  Dropdown,
} from "react-bootstrap";
import "./style.css";
import React, { useState } from "react";

const Product = () => {
  const [sort, setSort] = useState("Price, low to High");

  const inputSort = (event) => {
    setSort(event.target.innerText);
    console.log(event.target.innerHTML);
  };

  return (
    <div className="space-md">
      <div className="py-1 d-flex justify-content-between header">
        <h3 className="px-2 align-self-center">All Product</h3>
        <Dropdown className="pe-2 d-flex align-items-baseline">
          <h4>Sort by:</h4>
          <Dropdown.Toggle
            className="sort-button"
            size="sm"
            id="dropdown-basic"
          >
            {sort}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1" onClick={inputSort}>
              <h4>Price, low to High</h4>
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2" onClick={inputSort}>
              <h4>Price, High to Low</h4>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="product-items mt-3">
        <Row className="d-flex flex-wrap">
          <Col md={3}>
            <Card.Link href="##" target="_blank">
              <Card>
                <Card.Body className="p-0">
                  <div className="product-background">
                    <Card.Img
                      variant="top"
                      src="https://cdn4.425degree.com/media/SaekiiOnDuty/Keychron/DSC03812-Edit.png"
                    />
                  </div>
                  <br />
                  <Card.Title className="product-name">
                    Keychron K2 Wireless Mechanical Keyboard
                  </Card.Title>
                  <Card.Title className="price mt-5 pe-3">$69</Card.Title>
                </Card.Body>
              </Card>
            </Card.Link>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body className="p-0">
                <div className="product-background">
                  <Card.Img
                    variant="top"
                    src="https://blog.nsru.ac.th/wp-content/uploads/2019/10/Key_1_1.jpg"
                  />
                </div>
                <br />
                <Card.Title className="product-name">
                  Keychron K2 Wireless Mechanical Keyboard
                </Card.Title>
                <Card.Title className="price mt-5 pe-3">$69</Card.Title>
                {/* <Card.Link href="##" target="_blank">
                  <Button variant="warning">Read more</Button>
                </Card.Link> */}
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body className="p-0">
                <div className="product-background">
                  <Card.Img
                    variant="top"
                    src="https://blog.nsru.ac.th/wp-content/uploads/2019/10/Key_1_1.jpg"
                  />
                </div>
                <br />
                <Card.Title className="product-name">
                  Keychron K2 Wireless Mechanical Keyboard
                </Card.Title>
                <Card.Title className="price mt-5 pe-3">$69</Card.Title>
                {/* <Card.Link href="##" target="_blank">
                  <Button variant="warning">Read more</Button>
                </Card.Link> */}
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body className="p-0">
                <div className="product-background">
                  <Card.Img
                    variant="top"
                    src="https://blog.nsru.ac.th/wp-content/uploads/2019/10/Key_1_1.jpg"
                  />
                </div>
                <br />
                <Card.Title className="product-name">
                  Keychron K2 Wireless Mechanical Keyboard
                </Card.Title>
                <Card.Title className="price mt-5 pe-3">$69</Card.Title>
                {/* <Card.Link href="##" target="_blank">
                  <Button variant="warning">Read more</Button>
                </Card.Link> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={3}>
            <Card>
              <Card.Body className="p-0">
                <div className="product-background">
                  <Card.Img
                    variant="top"
                    src="https://cdn4.425degree.com/media/SaekiiOnDuty/Keychron/DSC03812-Edit.png"
                  />
                </div>
                <br />
                <Card.Title className="product-name">
                  Keychron K2 Wireless Mechanical Keyboard
                </Card.Title>
                <Card.Title className="price mt-5 pe-3">$69</Card.Title>
                {/* <Card.Link href="##" target="_blank">
                  <Button variant="warning">Read more</Button>
                </Card.Link> */}
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body className="p-0">
                <div className="product-background">
                  <Card.Img
                    variant="top"
                    src="https://blog.nsru.ac.th/wp-content/uploads/2019/10/Key_1_1.jpg"
                  />
                </div>
                <br />
                <Card.Title className="product-name">
                  Keychron K2 Wireless Mechanical Keyboard
                </Card.Title>
                <Card.Title className="price mt-5 pe-3">$69</Card.Title>
                {/* <Card.Link href="##" target="_blank">
                  <Button variant="warning">Read more</Button>
                </Card.Link> */}
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body className="p-0">
                <div className="product-background">
                  <Card.Img
                    variant="top"
                    src="https://blog.nsru.ac.th/wp-content/uploads/2019/10/Key_1_1.jpg"
                  />
                </div>
                <br />
                <Card.Title className="product-name">
                  Keychron K2 Wireless Mechanical Keyboard
                </Card.Title>
                <Card.Title className="price mt-5 pe-3">$69</Card.Title>
                {/* <Card.Link href="##" target="_blank">
                  <Button variant="warning">Read more</Button>
                </Card.Link> */}
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body className="p-0">
                <div className="product-background">
                  <Card.Img
                    variant="top"
                    src="https://blog.nsru.ac.th/wp-content/uploads/2019/10/Key_1_1.jpg"
                  />
                </div>
                <br />
                <Card.Title className="product-name">
                  Keychron K2 Wireless Mechanical Keyboard
                </Card.Title>
                <Card.Title className="price mt-5 pe-3">$69</Card.Title>
                {/* <Card.Link href="##" target="_blank">
                  <Button variant="warning">Read more</Button>
                </Card.Link> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Product;
