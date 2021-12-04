import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_ORDERS } from "../../Graphql/Queries";
import Order from "./Order";
import Header from "../Header";
import "./style.css";

const Orders = () => {
  /*--------------------------Query-------------------------------*/
  const { data, error, refetch } = useQuery(GET_USER_ORDERS);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (data) {
      setOrders(data.orderByUser);
    }
  }, [data]);
  console.log(data);
  /*--------------------------Query-------------------------------*/
  return (
    <>
      <Header text="Order" />
      {orders.map((order) => (
        <Order
          key={order.id}
          id={order.id}
          pic={order.product.picURL}
          name={order.product.name}
          quantity={-order.quantity}
          netPrice={-order.netPrice}
          address={order.orderAddress}
          status={order.status}
          refetch={refetch}
        />
      ))}
    </>
  );
};
export default Orders;
