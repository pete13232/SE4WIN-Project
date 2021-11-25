import { Row, Col, Table, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import AddProductModal from "../Modal/AddProductModal";
import "./style.css";
import { useQuery, useMutation } from "@apollo/client";
import { ADMIN_GET_PRODUCTS } from "../../Graphql/Queries";
import AdminStockChild from "./AdminStockChild";
import Swal from "sweetalert2";

const AdminStock = ({ id }) => {
  const { data, error } = useQuery(ADMIN_GET_PRODUCTS);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (data) {
      setProducts(data.products);
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
                  id={product.id}
                  name={product.name}
                  category={product.category.name}
                  price={product.price}
                  desc={product.price}
                  img={product.picURL}
                  stock={product.stock}
                />
              ))}
            </tbody>
          </Table>
        </Col>
      )}
      F{/* Modal */}
      <AddProductModal
        showProduct={showProduct}
        setShowProduct={setShowProduct}
      />
    </>
  );
};
export default AdminStock;
