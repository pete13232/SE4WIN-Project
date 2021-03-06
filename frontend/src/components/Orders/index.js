import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_ORDERS } from "../../Graphql/Queries";
import Order from "./Order";
import Header from "../Header";
import "./style.css";

const Orders = () => {
  /*--------------------------Query-------------------------------*/
  const { data, refetch } = useQuery(GET_USER_ORDERS);//query user orders
  const [orders, setOrders] = useState([]);//orders state

  useEffect(() => {//initial data when data change
    if (data) {
      setOrders(data.orderByUser);
    }
  }, [data]);
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
