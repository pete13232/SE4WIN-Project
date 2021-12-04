import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Col, Row, Image, Carousel } from "react-bootstrap";
import Header from "../Header";
import "./style.css";
import { GET_PRODUCTS_BY_CATEGORY } from "../../Graphql/Queries";

const Category = () => {
  const { data, error, refetch } = useQuery(GET_PRODUCTS_BY_CATEGORY);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (data) {
      setProducts(data.AdminProducts);
    }
  }, [data]);
  return (
    <>
      <Header text="Category"></Header>
      <Carousel>
        <Carousel.Item interval={100000000}>
          <Row className="g-0 category">
            <Col className="card">
              <a href="#">
                <Image src="https://cdn4.425degree.com/media/SaekiiOnDuty/Keychron/DSC03812-Edit.png"></Image>
              </a>
              <div className="card-img-overlay text-center">
                <h4>test2</h4>
              </div>
            </Col>
            <Col className="card">
              <a href="#">
                <Image src="https://cdn4.425degree.com/media/SaekiiOnDuty/Keychron/DSC03812-Edit.png"></Image>
              </a>
              <div className="card-img-overlay text-center">
                <h4>test2</h4>
              </div>
            </Col>
            <Col className="card">
              <Image src="https://cf.shopee.co.th/file/357d8160cfdc5098363d37e0c39b6fa4"></Image>
              <div className="card-img-overlay text-center">
                <h4>test3</h4>
              </div>
            </Col>
            <Col className="card">
              <Image src="https://cf.shopee.co.th/file/c223514d0c7dc1a0419abb9618dad98a"></Image>
              <div className="card-img-overlay text-center">
                <h4>test4</h4>
              </div>
            </Col>
            <Col className="card">
              <Image src="https://blog.nsru.ac.th/wp-content/uploads/2019/10/Key_1_1.jpg"></Image>
            </Col>
            <Col className="card">
              <Image src="https://media.istockphoto.com/photos/programming-code-abstract-technology-background-of-software-developer-picture-id1224500457?b=1&k=20&m=1224500457&s=170667a&w=0&h=OOPEMFamnZo63_2t_W40mYSfU1WrFAHHZRBgNN-GSgI="></Image>
            </Col>
          </Row>
        </Carousel.Item>
        <Carousel.Item interval={100000000}>
          <Row className="g-0 category">
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
    </>
  );
};

export default Category;
