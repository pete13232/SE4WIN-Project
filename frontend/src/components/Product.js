import {
  Container,
  Col,
  Row,
  Image,
  Card,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";

const Product = () => {
  return (
    <div className="space-md">
      <div
        style={{ background: "white" }}
        className="py-1 d-flex justify-content-between"
      >
        <h3 className="px-2 align-self-center">All Product</h3>
        <Form className="me-3">
          <FormControl
            type="search"
            placeholder="Search for product"
            className="me-2"
            aria-label="Search"
          />
          {/* <Button variant="outline-success">Search</Button> */}
        </Form>
      </div>
      <div className="product-items mt-2">
        <Row>
          <Col md={3}>
            <Card>
              <Card.Body style={{ padding: 0 }}>
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
              <Card.Body style={{ padding: 0 }}>
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
              <Card.Body style={{ padding: 0 }}>
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
              <Card.Body style={{ padding: 0 }}>
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

        <Row className="mt-2">
          <Col md={3}>
            <Card>
              <Card.Body style={{ padding: 0 }}>
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
              <Card.Body style={{ padding: 0 }}>
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
              <Card.Body style={{ padding: 0 }}>
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
              <Card.Body style={{ padding: 0 }}>
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
