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
// import "./style.css";
import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { GET_PRODUCTS } from "../../Graphql/Queries";
import Product from "./Product/index";

const Products = () => {
  const { data, error } = useQuery(GET_PRODUCTS);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data) {
      setProducts(data.products);
    }
  }, [data]);

  console.log(data);

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
        </Form>
      </div>
      <div className="product-items mt-2">
        <Row>
          {products.map((val) => (
            <Product
              key={val.id}
              name={val.name}
              price={val.price}
              img={val.picURL}
            />
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Products;
