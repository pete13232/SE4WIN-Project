import { Container, Col, Row, Image, Card, Button, Form, FormControl } from "react-bootstrap";

const Product = () => {
  return (
    <div className="space-md">
      <div style={{ background: "white" }} className="py-1 d-flex justify-content-between">
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
      <div className="space-sm">
        <Row>
          <Col md={3}>
            <Card style={{ padding: 20 }}>
              <Card.Body>
                <Card.Img
                  variant="top"
                  src="https://media.istockphoto.com/photos/programming-code-abstract-technology-background-of-software-developer-picture-id1224500457?b=1&k=20&m=1224500457&s=170667a&w=0&h=OOPEMFamnZo63_2t_W40mYSfU1WrFAHHZRBgNN-GSgI="
                />
                <br />
                <Card.Title>Some title</Card.Title>
                <Card.Title>Our daily news to learn while reading</Card.Title>
                <Card.Link href="##" target="_blank">
                  <Button variant="warning">Read more</Button>
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card style={{ padding: 20 }}>
              <Card.Body>
                <Card.Img
                  variant="top"
                  src="https://cdn4.425degree.com/media/SaekiiOnDuty/Keychron/DSC03812-Edit.png"
                />
                <br />
                <Card.Title>Some title</Card.Title>
                <Card.Title>Our daily news to learn while reading</Card.Title>
                <Card.Link href="##" target="_blank">
                  <Button variant="warning">Read more</Button>
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card style={{ padding: 20 }}>
              <Card.Body>
                <Card.Img
                  variant="top"
                  src="https://cdn4.425degree.com/media/SaekiiOnDuty/Keychron/DSC03812-Edit.png"
                />
                <br />
                <Card.Title>Some title</Card.Title>
                <Card.Title>Our daily news to learn while reading</Card.Title>
                <Card.Link href="##" target="_blank">
                  <Button variant="warning">Read more</Button>
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card style={{ padding: 20 }}>
              <Card.Body>
                <Card.Img
                  variant="top"
                  src="https://cdn4.425degree.com/media/SaekiiOnDuty/Keychron/DSC03812-Edit.png"
                />
                <br />
                <Card.Title>Some title</Card.Title>
                <Card.Title>Our daily news to learn while reading</Card.Title>
                <Card.Link href="##" target="_blank">
                  <Button variant="warning">Read more</Button>
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card style={{ padding: 20 }}>
              <Card.Body>
                <Card.Img
                  variant="top"
                  src="https://cdn4.425degree.com/media/SaekiiOnDuty/Keychron/DSC03812-Edit.png"
                />
                <br />
                <Card.Title>Some title</Card.Title>
                <Card.Title>Our daily news to learn while reading</Card.Title>
                <Card.Link href="##" target="_blank">
                  <Button variant="warning">Read more</Button>
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card style={{ padding: 20 }}>
              <Card.Body>
                <Card.Img
                  variant="top"
                  src="https://cdn4.425degree.com/media/SaekiiOnDuty/Keychron/DSC03812-Edit.png"
                />
                <br />
                <Card.Title>Some title</Card.Title>
                <Card.Title>Our daily news to learn while reading</Card.Title>
                <Card.Link href="##" target="_blank">
                  <Button variant="warning">Read more</Button>
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card style={{ padding: 20 }}>
              <Card.Body>
                <Card.Img
                  variant="top"
                  src="https://cdn4.425degree.com/media/SaekiiOnDuty/Keychron/DSC03812-Edit.png"
                />
                <br />
                <Card.Title>Some title</Card.Title>
                <Card.Title>Our daily news to learn while reading</Card.Title>
                <Card.Link href="##" target="_blank">
                  <Button variant="warning">Read more</Button>
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card style={{ padding: 20 }}>
              <Card.Body>
                <Card.Img
                  variant="top"
                  src="https://cdn4.425degree.com/media/SaekiiOnDuty/Keychron/DSC03812-Edit.png"
                />
                <br />
                <Card.Title>Some title</Card.Title>
                <Card.Title>Our daily news to learn while reading</Card.Title>
                <Card.Link href="##" target="_blank">
                  <Button variant="warning">Read more</Button>
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Product;
