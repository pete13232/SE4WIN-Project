import { Row, Dropdown, Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  GET_CATEGORY,
  GET_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCTS_BY_NAME,
} from "../../Graphql/Queries";
import Product from "./Product/index";
import Header from "../../components/Header";
import "./style.css";

const Products = ({
  queryState,
  setQueryState,
  searchName,
  setSearchName,
  filterCategoryId,
  setFilterCategoryId,
  resetState,
}) => {
  /*-----------------------Initial State---------------------------------*/
  const [page, setPage] = useState(1); // select page state
  const [sort, setSort] = useState("Price, low to High"); // select sort text state
  const [sortVal, setSortVal] = useState(1); //select sort value state
  const [products, setProducts] = useState([]); //show products state
  const [pageCount, setPageCount] = useState(1); //page count of show products state
  const [categoryName, setCategoryName] = useState(""); // filtered category name state
  /*-----------------------Initial State---------------------------------*/

  /*----------------------------Query------------------------------------*/

  const [getCategory, { data: dataCategory }] = useLazyQuery(GET_CATEGORY); //query to get category name

  useEffect(() => {
    // initial state of page when query state is change
    if (queryState) {
      setPage(1);
    }
  }, [queryState]);

  useEffect(() => {
    // initial state when filtered by category
    if (filterCategoryId) {
      getCategory({
        variables: { id: Number(filterCategoryId) },
      });
    }
    if (dataCategory) {
      setCategoryName(dataCategory?.category.name);
    }
  }, [filterCategoryId, dataCategory, getCategory]);

  const [getProducts, { data: dataNormal }] = useLazyQuery(GET_PRODUCTS); //query for all products
  const [getProductsByCategory, { data: dataByCategory }] = useLazyQuery(
    GET_PRODUCTS_BY_CATEGORY
  ); //query for filtred product by category
  const [getProductsByName, { data: dataByName }] =
    useLazyQuery(GET_PRODUCTS_BY_NAME); //query for filtered products by search name

  const inputSort = (event, val) => {
    // set sort value and text state function
    setSort(event.target.innerText);
    setSortVal(val);
  };

  useEffect(() => {
    //initial state of show products by changing of queryState
    switch (queryState) {
      case 1: // All products
        getProducts({
          //query all products
          variables: { sort: sortVal, page: page },
        });
        if (dataNormal) {
          setProducts(dataNormal?.products.data); //set show products
          setPageCount(Math.ceil(dataNormal?.products.totalCount / 12)); //set page count of show products
        }
        break;
      case 2: //Filtered products by category
        getProductsByCategory({
          //query products by category
          variables: {
            categoryId: filterCategoryId,
            sort: sortVal,
            page: page,
          },
        });
        if (dataByCategory) {
          setProducts(dataByCategory?.ProductByCategory.data); //set show products
          setPageCount(
            Math.ceil(dataByCategory?.ProductByCategory.totalCount / 12) //set page count of show products
          );
        }

        break;
      case 3: //Filtered products by name
        getProductsByName({
          //query products by naem
          variables: { name: searchName, sort: sortVal, page: page },
        });
        if (dataByName) {
          setProducts(dataByName?.ProductByName.data); //set show products
          setPageCount(Math.ceil(dataByName?.ProductByName.totalCount / 12)); //set page count of show products
        }
        break;
      default:
        // default state (all prducts)
        getProducts({
          variables: { sort: sortVal, page: page },
        });
        if (dataNormal) {
          setProducts(dataNormal?.products.data);
          setPageCount(Math.ceil(dataNormal?.products.totalCount / 12));
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
  ]); //dependency value

  /*----------------------------Query------------------------------------*/

  /*----------------------------Sorting dropdown component state------------------------------------*/

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

  /*----------------------------Sorting dropdown component state------------------------------------*/
  /*--------------------Header text selector------------------------------*/
  const selectHeaderText = () => {
    if (queryState === 2) {
      return `Category of `;
    } else if (queryState === 3) {
      return `Search result for `;
    } else {
      return "All product";
    }
  };
  /*--------------------Header text selector------------------------------*/
  return (
    <>
      {products && ( // show if only have products
        <>
          <Header
            text={selectHeaderText()}
            categoryColor={categoryName}
            searchColor={searchName}
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
          {/* -------------------------------Pagination------------------------------------  */}
          <Pagination className="justify-content-end me-4">
            <Pagination.First
              onClick={() => {
                setPage(1);
              }}
            />
            <Pagination.Prev
              onClick={() => {
                if (page - 1 > 0) setPage(page - 1);
              }}
            />
            {page - 2 > 0 && <Pagination.Ellipsis disabled />}
            {page - 2 > 0 && (
              <Pagination.Item
                onClick={() => {
                  if (page - 2 > 0) setPage(page - 2);
                }}
              >
                {page - 2}
              </Pagination.Item>
            )}
            {page - 1 > 0 && (
              <Pagination.Item
                onClick={() => {
                  if (page - 1 > 0) setPage(page - 1);
                }}
              >
                {page - 1}
              </Pagination.Item>
            )}
            <Pagination.Item active>{page}</Pagination.Item>
            {page + 1 <= pageCount && (
              <Pagination.Item
                onClick={() => {
                  if (page + 1 <= pageCount) setPage(page + 1);
                }}
              >
                {page + 1}
              </Pagination.Item>
            )}
            {page + 2 <= pageCount && (
              <Pagination.Item
                onClick={() => {
                  if (page + 2 <= pageCount) setPage(page + 2);
                }}
              >
                {page + 2}
              </Pagination.Item>
            )}
            {page + 2 < pageCount && <Pagination.Ellipsis disabled />}
            <Pagination.Next
              onClick={() => {
                if (page + 1 <= pageCount) setPage(page + 1);
              }}
            />
            <Pagination.Last
              onClick={() => {
                setPage(pageCount);
              }}
            />
          </Pagination>
          {/* -------------------------------Pagination------------------------------------  */}
        </>
      )}
    </>
  );
};

export default Products;
