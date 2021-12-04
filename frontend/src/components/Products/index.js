import { Row, Dropdown, Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../Graphql/Queries";
import Product from "./Product/index";
import Header from "../../components/Header";
import "./style.css";

const Products = () => {
  const [sort, setSort] = useState("Price, low to High");
  const [sortVal, setSortVal] = useState(1)
  const inputSort = (event, val ) => {
    setSort(event.target.innerText);
    setSortVal(val)
  };

  const { data, error } = useQuery(GET_PRODUCTS,{
    variables: { sort: sortVal },
  } );
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
          <Dropdown.Item href="#/action-1" onClick={(event)=>{
            inputSort(event,1)
            }}>
            <h4>Price, low to High</h4>
          </Dropdown.Item>
          <Dropdown.Item href="#/action-2" onClick={(event)=>{
            inputSort(event,0)
            }}>
            <h4>Price, High to Low</h4>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const [page, setPage] = useState(1)
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
      {/* <Pagination className="justify-content-end me-4">
        <Pagination.First />
        <Pagination.Item>{1}</Pagination.Item>
        {page-2 > 0 (<Pagination.Ellipsis disabled/>)}
        {page-2 > 0 &&(<Pagination.Item>{page-2}</Pagination.Item>)}
        {page-1 > 0 &&(<Pagination.Item>{page-1}</Pagination.Item>)}
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Item>{13}</Pagination.Item>
        <Pagination.Item disabled>{14}</Pagination.Item>
        <Pagination.Item>{20}</Pagination.Item>
        <Pagination.Ellipsis disabled/>
        <Pagination.Last />
      </Pagination> */}
    </>
  );
};

export default Products;
