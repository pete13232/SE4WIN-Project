import { Row, Dropdown, Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../Graphql/Queries";
import Product from "./Product/index";
import Header from "../../components/Header";
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

  const dropdown = () => {
    return (
      <Dropdown className="pe-3 d-flex align-items-baseline">
        <h4>Sort by:</h4>
        <Dropdown.Toggle className="sort-button" size="sm" id="dropdown-basic">
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
    );
  };

  return (
    <>
      <Header text="All Product" dropdown={dropdown()}></Header>
      <Row className="product-items mt-3">
        {products.map((val) => (
          <Product
            name={val.name}
            price={val.price}
            img={val.picURL}
            id={val.id}
          />
        ))}
      </Row>
      <Pagination className="justify-content-end me-4">
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />

        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Item>{11}</Pagination.Item>
        <Pagination.Item active>{12}</Pagination.Item>
        <Pagination.Item>{13}</Pagination.Item>
        <Pagination.Item disabled>{14}</Pagination.Item>

        <Pagination.Ellipsis />
        <Pagination.Item>{20}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </>
  );
};

export default Products;
