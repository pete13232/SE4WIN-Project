import { Row, Dropdown, Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS, GET_PRODUCTS_BY_CATEGORY, GET_PRODUCTS_BY_NAME } from "../../Graphql/Queries";
import Product from "./Product/index";
import Header from "../../components/Header";
import "./style.css";

const Products = ( categoryId, search ) => {
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState("Price, low to High");
  const [sortVal, setSortVal] = useState(1)
  const [selectQuery,setSelectQuery] = useState()
  const inputSort = (event, val ) => {
    setSort(event.target.innerText);
    setSortVal(val)
  };

  const { dataNormal } = useQuery(GET_PRODUCTS,{
    variables: { sort: sortVal, page:page },
  } );

  
  const { dataByCategory } = useQuery(GET_PRODUCTS_BY_CATEGORY,{
    variables: { categoryId: categoryId },
  } );


  const { dataByName } = useQuery(GET_PRODUCTS_BY_NAME,{
    variables: { name: search },
  } );


  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (dataNormal) {
      setProducts(dataNormal.products);
    }
  }, [dataNormal]);

  useEffect(() => {
    if (dataByCategory) {
      setProducts(dataByCategory.ProductByCategory);
    }
  }, [dataByCategory]);

  useEffect(() => {
    if (dataByName) {
      setProducts(dataByName.products);
    }
  }, [dataByName]);

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

  console.log(products)
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
        <Pagination.Item>{1}</Pagination.Item>
        {page-2 > 0 &&(<Pagination.Ellipsis disabled/>)}
        {page-2 > 0 &&(<Pagination.Item>{page-2}</Pagination.Item>)}
        {page-1 > 0 &&(<Pagination.Item>{page-1}</Pagination.Item>)}
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Item>{13}</Pagination.Item>
        <Pagination.Item disabled>{14}</Pagination.Item>
        <Pagination.Item>{20}</Pagination.Item>
        <Pagination.Ellipsis disabled/>
        <Pagination.Last />
      </Pagination>
    </>
  );
};

export default Products;
