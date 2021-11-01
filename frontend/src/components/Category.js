import { Container, Col, Row, Image, Carousel } from "react-bootstrap";

const Category = () => {
  return (
    <div className="space-md">
      <div style={{ background: "white" }} className="py-1">
        <h3 className="px-2">Category</h3>
      </div>
      <Carousel>
        <Carousel.Item interval={100000000}>
          <Row className="g-0 category" style={{ background: "pink" }}>
            {/*ใส่สไตล์เพื่อเช็ค padding เดี๋ยวมาลบ*/}
            <Col className="card">
              <Image src="https://media.istockphoto.com/photos/programming-code-abstract-technology-background-of-software-developer-picture-id1224500457?b=1&k=20&m=1224500457&s=170667a&w=0&h=OOPEMFamnZo63_2t_W40mYSfU1WrFAHHZRBgNN-GSgI="></Image>
              <div className="card-img-overlay text-white d-flex align-items-end align-content-center">
                <h4 className="text-white">test</h4>
              </div>
            </Col>
            <Col className="card">
              <Image src="https://media.istockphoto.com/photos/programming-code-abstract-technology-background-of-software-developer-picture-id1224500457?b=1&k=20&m=1224500457&s=170667a&w=0&h=OOPEMFamnZo63_2t_W40mYSfU1WrFAHHZRBgNN-GSgI="></Image>
              <div className="card-img-overlay text-white text-center">
                <h4 className="text-white">test2</h4>
              </div>
            </Col>
            <Col className="card">
              <Image src="https://cdn4.425degree.com/media/SaekiiOnDuty/Keychron/DSC03812-Edit.png"></Image>
            </Col>
            <Col className="card">
              <Image src="https://media.istockphoto.com/photos/programming-code-abstract-technology-background-of-software-developer-picture-id1224500457?b=1&k=20&m=1224500457&s=170667a&w=0&h=OOPEMFamnZo63_2t_W40mYSfU1WrFAHHZRBgNN-GSgI="></Image>
            </Col>
            <Col className="card">
              <Image src="https://blog.nsru.ac.th/wp-content/uploads/2019/10/Key_1_1.jpg"></Image>
            </Col>
            <Col className="card">
              <Image src="https://media.istockphoto.com/photos/programming-code-abstract-technology-background-of-software-developer-picture-id1224500457?b=1&k=20&m=1224500457&s=170667a&w=0&h=OOPEMFamnZo63_2t_W40mYSfU1WrFAHHZRBgNN-GSgI="></Image>
            </Col>
          </Row>
          {/* <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item interval={100000000}>
          <Row className="g-0 category" style={{ background: "pink" }}>
            {/*ใส่สไตล์เพื่อเช็ค padding เดี๋ยวมาลบ*/}
            <Col className="card">
              <Image src="https://ae01.alicdn.com/kf/Hfc71b9e78e54414f9e1f87a928fedbb1F/Beats-Powerbeats-Pro.jpg_q50.jpg"></Image>
              <div className="card-img-overlay text-white d-flex align-items-end align-content-center">
                <h4>test อีกหน้า</h4>
              </div>
            </Col>
            <Col className="card">
              <Image src="https://ae01.alicdn.com/kf/Hfc71b9e78e54414f9e1f87a928fedbb1F/Beats-Powerbeats-Pro.jpg_q50.jpg"></Image>
            </Col>
            <Col className="card">
              <Image src="https://ae01.alicdn.com/kf/Hfc71b9e78e54414f9e1f87a928fedbb1F/Beats-Powerbeats-Pro.jpg_q50.jpg"></Image>
            </Col>
            <Col className="card">
              <Image src="https://ae01.alicdn.com/kf/Hfc71b9e78e54414f9e1f87a928fedbb1F/Beats-Powerbeats-Pro.jpg_q50.jpg"></Image>
            </Col>
            <Col className="card">
              <Image src="https://blog.nsru.ac.th/wp-content/uploads/2019/10/Key_1_1.jpg"></Image>
            </Col>
            <Col className="card">
              <Image src="https://ae01.alicdn.com/kf/Hfc71b9e78e54414f9e1f87a928fedbb1F/Beats-Powerbeats-Pro.jpg_q50.jpg"></Image>
            </Col>
          </Row>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Category;
