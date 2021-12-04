import { Col, Row, Card, Dropdown } from "react-bootstrap";
// import "./style.css";
import { useEffect, useState } from "react";
import { Route, Link, useRouteMatch } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { GET_PRODUCTS } from "../../Graphql/Queries";
import Product from "./Product/index";
import ProductSelectContainer from "../../container/ProductSelectContainer/index.js";
import "./style.css";

const Products = () => {
  const [sort, setSort] = useState("Price, low to High");
  const inputSort = (event) => {
    setSort(event.target.innerText);
    console.log(event.target.innerHTML);
  };

  const { data, error } = useQuery(GET_PRODUCTS);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (data) {
      setProducts(data.products);
    }
  }, [data]);

  return (
    <div className="space-md">
      <div className="py-1 d-flex justify-content-between header">
        <h3 className="px-2 align-self-center">All Product</h3>
        <Dropdown className="pe-3 d-flex align-items-baseline">
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
      {/* <div className="product-items mt-3"> */}
      <Row className="product-items mt-3">
        {products.map((val) => (
            <Product name={val.name} price={val.price} img={val.picURL} id={val.id}/>
        ))}
      </Row>
      {/* </div> */}
    </div>
  );
};

export default Products;
