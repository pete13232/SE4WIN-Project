import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ADMIN_GET_PRODUCTS } from "../../Graphql/Queries";
import { Col, Table, Button } from "react-bootstrap";
import AdminStockChild from "./AdminStockChild";
import AddProductModal from "../Modal/AddProductModal";
import "./style.css";

const AdminStock = ({ id }) => {
  const { data, error, refetch } = useQuery(ADMIN_GET_PRODUCTS);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (data) {
      setProducts(data.AdminProducts);
    }
  }, [data]);

  const [showProduct, setShowProduct] = useState(false);
  return (
    <>
      {id === "stock" && (
        <Col md={10} className="bg-white admin-stock">
          <Button
            onClick={() => {
              setShowProduct(true);
            }}
            className="mx-4 my-3 blue btn-medium"
          >
            +Product
          </Button>
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
