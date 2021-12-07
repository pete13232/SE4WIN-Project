import { useState, useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  ADMIN_GET_PRODUCTS,
  ADMIN_SEARCH_PRODUCTS,
} from "../../Graphql/Queries";
import { Col, Table, Button, Form, FormControl } from "react-bootstrap";
import AdminStockChild from "./AdminStockChild";
import AddProductModal from "../Modal/AddProductModal";
import "./style.css";
import { useForm } from "react-hook-form";

const AdminStock = ({ id }) => {
  const { data, refetch } = useQuery(ADMIN_GET_PRODUCTS);
  const [getProducts, { data: dataSearch }] = useLazyQuery(
    ADMIN_SEARCH_PRODUCTS
  );
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [showProduct, setShowProduct] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = (submit) => {
    setSearch(submit.name);
  };

  useEffect(() => {
    if (search) {
      getProducts({
        variables: { name: search },
      });
    }

    if (data && !search) {
      setProducts(data.AdminProducts);
    } else if (dataSearch) {
      setProducts(dataSearch.AdminProductByName.data);
    }
  }, [data, getProducts, search, dataSearch]);

  return (
    <>
      {id === "stock" && (
        <Col md={10} className="bg-white admin-stock">
          <div className="d-flex align-items-center gap-1">
            <Form
              id="search-form"
              className="search-order my-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl
                type="search"
                placeholder="Search for category"
                className="me-2"
                aria-label="Search"
                {...register("name")}
              />
            </Form>
            {search && (
              <Button
                onClick={() => {
                  setSearch(null);
                  document.getElementById("search-form").reset();
                }}
                className="mx-4 my-3 red btn-small"
              >
                clear
              </Button>
            )}
            <Button
              onClick={() => {
                setShowProduct(true);
              }}
              className="mx-4 my-3 blue btn-medium"
            >
              +Product
            </Button>
          </div>
          <Table striped bordered hover className="px-1">
            <thead className="table-head">
              <tr className="text-center">
                <th>P_ID</th>
                <th>P_Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Description</th>
                <th>Picture</th>
                <th>Quantity</th>
                <th>modify</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <AdminStockChild
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  category={product.category.name}
                  price={product.price}
                  desc={product.desc}
                  img={product.picURL}
                  stock={product.stock}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </Table>
        </Col>
      )}

      {/*---------Modal----------- */}

      <AddProductModal
        showProduct={showProduct}
        setShowProduct={setShowProduct}
        refetch={refetch}
      />
    </>
  );
};
export default AdminStock;
