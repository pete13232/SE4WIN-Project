import { Row, Dropdown, Pagination } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  GET_CATEGORY,
  GET_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCTS_BY_NAME,
} from "../../Graphql/Queries";
import Product from "./Product/index";
import Header from "../../components/Header";
import "./style.css";
import { QueryContext } from "../../context/query";

const Products = ({
  queryState,
  setQueryState,
  searchName,
  setSearchName,
  filterCategoryId,
  setFilterCategoryId,
  resetState
}) => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("Price, low to High");
  const [sortVal, setSortVal] = useState(1);
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  const [categoryName, setCategoryName] = useState("");
  const [getCategory, { data: dataCategory }] = useLazyQuery(GET_CATEGORY);

  useEffect(() => {
    if (filterCategoryId) {
      getCategory({
        variables: { id: Number(filterCategoryId) },
      });
    }
    if (dataCategory) {
      setCategoryName(dataCategory?.category.name);
    }
  }, [filterCategoryId, dataCategory]);

  const [getProducts, { data: dataNormal }] = useLazyQuery(GET_PRODUCTS);
  const [getProductsByCategory, { data: dataByCategory }] = useLazyQuery(
    GET_PRODUCTS_BY_CATEGORY
  );
  const [getProductsByName, { data: dataByName }] =
    useLazyQuery(GET_PRODUCTS_BY_NAME);

  const inputSort = (event, val) => {
    setSort(event.target.innerText);
    setSortVal(val);
  };


  useEffect(() => {
    // console.log(queryState);
    switch (queryState) {
      case 1:
        getProducts({
          variables: { sort: sortVal, page: page },
        });
        if (dataNormal) {
          setProducts(dataNormal?.products.data);
          setPageCount(Math.ceil(dataNormal?.products.totalCount)/12);
        }
        break;
      case 2:
        getProductsByCategory({
          variables: {
            categoryId: filterCategoryId,
            sort: sortVal,
            page: page,
          },
        });
        if (dataByCategory) {
          setProducts(dataByCategory?.ProductByCategory.data);
          setPageCount(Math.ceil(dataByCategory?.ProductByCategory.totalCount)/12);
        }

        break;
      case 3:
        getProductsByName({
          variables: { name: searchName, sort: sortVal, page: page },
        });
        if (dataByName) {
          console.log(dataByName);
          setProducts(dataByName?.ProductByName.data);
          setPageCount(Math.ceil(dataByName?.ProductByName.totalCount)/12);
        }
        break;
      default:
        getProducts({
          variables: { sort: sortVal, page: page },
        });
        if (dataNormal) {
          setProducts(dataNormal?.products.data);
          setPageCount(Math.ceil(dataNormal?.products.totalCount)/12);
        }

        break;
    }
  }, [
    getProducts,
    getProductsByCategory,
    getProductsByName,
    queryState,
    sortVal,
    page,
    filterCategoryId,
    searchName,
    dataNormal,
    dataByName,
    dataByCategory,
  ]);

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

  const selectHeaderText = () => {
    if (queryState === 2) {
      return `Category of "${categoryName}"`;
    } else if (queryState === 3) {
      return `Search result for "${searchName}"`;
    } else {
      return "All product";
    }
  };
  console.log(products);
  return (
    <>
      {products && (
        <>
          <Header
            text={selectHeaderText()}
            dropdown={dropdown()}
            queryState={queryState}
            resetState={resetState}
          ></Header>
          <Row className="product-items mt-3">
            {products.map((product, index) => (
              <Product
                key={index}
                name={product.name}
                price={product.price}
                img={product.picURL}
                id={product.id}
              />
            ))}
          </Row>
          <Pagination className="justify-content-end me-4">
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>

            {page - 2 > 0 && <Pagination.Ellipsis disabled />}
            {page - 2 > 0 && <Pagination.Item>{page - 2}</Pagination.Item>}
            {page - 1 > 0 && <Pagination.Item>{page - 1}</Pagination.Item>}
            <Pagination.Item active>{page}</Pagination.Item>
            <Pagination.Item>{13}</Pagination.Item>
            <Pagination.Item disabled>{14}</Pagination.Item>
            <Pagination.Item>{20}</Pagination.Item>
            <Pagination.Ellipsis disabled />
            <Pagination.Next />
            <Pagination.Last />
          </Pagination>
        </>
      )}
    </>
  );
};

export default Products;
