import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  Col,
  Table,
  Form,
  FormControl
} from "react-bootstrap";
import { ADMIN_GET_ORDERS } from "../../Graphql/Queries";
import AdminOrderChild from "./AdminOrderChild";
import "./style.css";

const AdminOrder = ({ id }) => {
  /*-------------------------Query----------------------------- */
  const { data, refetch } = useQuery(ADMIN_GET_ORDERS);
  const [orders, setOrders] = useState();

  useEffect(() => {
    if (data) {
      setOrders(data.orders);
    }
  }, [data]);
  /*-------------------------Query----------------------------- */

  return (
    <>
      {id === "order" && (
        <Col md={10} className="bg-white admin-order">
          <Form className="search-order my-3">
            <FormControl
              type="search"
              placeholder="Search for order"
              className="me-2"
              aria-label="Search"
            />
          </Form>
          <Table striped bordered hover className="px-1">
            <thead className="table-head">
              <tr>
                <th>Order_ID</th>
                <th>Product_ID</th>
                <th>User_ID</th>
                <th>Address</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Reciept</th>
                <th>Status</th>
              </tr>
            </thead>
            {orders?.map((order)=>(
              <AdminOrderChild key={order.id}
              orderId={order.id}
              productId={order.product.id}
              userId={order.user.id}
              address={order.orderAddress}
              product={order.product.name}
              quantity={order.quantity}
              price={order.netPrice}
              reciept={order.recieptURL}
              status={order.status}
              refetch={refetch}
              />
            ))}
          </Table>
        </Col>
      )}
    </>
  );
};
export default AdminOrder;
