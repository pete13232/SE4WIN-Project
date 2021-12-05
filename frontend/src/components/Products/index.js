import { Row, Dropdown, Pagination } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  GET_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCTS_BY_NAME,
} from "../../Graphql/Queries";
import Product from "./Product/index";
import Header from "../../components/Header";
import "./style.css";
import { QueryContext } from "../../context/query";

const Products = (categoryId, search) => {
  const { queryState, setQueryState, searchName, filterCategoryId } =
    useContext(QueryContext);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("Price, low to High");
  const [sortVal, setSortVal] = useState(1);
  const [products, setProducts] = useState([]);

  const [
    getProducts,
    { data: dataNormal, loading: loadingNormal,  refetch, called  },
  ] = useLazyQuery(GET_PRODUCTS);
  const [
    getProductsByCategory,
    { data: dataByCategory, loading: loadingCategory },
  ] = useLazyQuery(GET_PRODUCTS_BY_CATEGORY);
  const [getProductsByName, { data: dataByName, loading: loadingName }] =
    useLazyQuery(GET_PRODUCTS_BY_NAME);

  const inputSort = (event, val) => {
    setSort(event.target.innerText);
    setSortVal(val);
  };
  useEffect(() => {
    switch (queryState) {
      case 1:
        {
          getProducts({
            variables: { sort: sortVal, page: page },
          });
        }
        break;
      case 2:
        {
          getProductsByCategory({
            variables: { categoryId: categoryId },
          });
        }
        break;
      case 3:
        {
          getProductsByName({
            variables: { name: search },
          });
        }
        break;
    }
  }, [queryState, sortVal, page, categoryId, search]);

  useEffect(() => {
    if (called) {
      console.log("2");
      refetch();
    }
    if (!loadingNormal) {
      console.log("1");
      setProducts(dataNormal?.products.data);
    } else if (!loadingCategory) {
      setProducts(dataByCategory?.products.data);
    } else if (!loadingName) {
      setProducts(dataByName?.products.data);
    }
  }, [loadingNormal, loadingCategory, loadingName]);

  const dropdown = () => {
    return (
      <Dropdown className="pe-3 d-flex align-items-baseline">
        <h4>Sort by:</h4>
        <Dropdown.Toggle className="sort-button" size="sm" id="dropdown-basic">
          {sort}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            href="#/action-1"
            onClick={(event) => {
              inputSort(event, 1);
              getProducts({
                variables: { sort: 1, page: page },
              });
            }}
          >
            <h4>Price, low to High</h4>
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-2"
            onClick={(event) => {
              inputSort(event, 0);
              getProducts({
                variables: { sort: 0, page: page },
              });
            }}
          >
            <h4>Price, High to Low</h4>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };
  // console.log(sortVal);
  return (
    <>
      {products && (
        <>
          <Header text="All Product" dropdown={dropdown()}></Header>
          <Row className="product-items mt-3">
            {products.map((product) => (
              <Product
                key={product.id}
                name={product.name}
                price={product.price}
                img={product.picURL}
                id={product.id}
              />
            ))}
          </Row>
          <Pagination className="justify-content-end me-4">
            <Pagination.First />
            <Pagination.Item>{1}</Pagination.Item>
            {page - 2 > 0 && <Pagination.Ellipsis disabled />}
            {page - 2 > 0 && <Pagination.Item>{page - 2}</Pagination.Item>}
            {page - 1 > 0 && <Pagination.Item>{page - 1}</Pagination.Item>}
            <Pagination.Item active>{page}</Pagination.Item>
            <Pagination.Item>{13}</Pagination.Item>
            <Pagination.Item disabled>{14}</Pagination.Item>
            <Pagination.Item>{20}</Pagination.Item>
            <Pagination.Ellipsis disabled />
            <Pagination.Last />
          </Pagination>
        </>
      )}
    </>
  );
};

export default Products;
