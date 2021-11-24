import ButtonCustom from "../ButtonCustom";
import "./style.css";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_ORDERS } from "../../Graphql/Queries";
import { AuthContext } from "../../context/auth";
import Order from "./Order";

const Orders = () => {
  const context = useContext(AuthContext);
  const { data, error } = useQuery(GET_USER_ORDERS);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (data) {
      setOrders(data.orderByUser);
    }
  }, [data]);
  return (
    <div>
      {orders.map((order) => (
        <Order
          key={order.id}
          pic={order.product.picURL}
          name={order.product.name}
          quantity={-order.quantity}
          netPrice={-order.netPrice}
          address={order.order_address}
          status={order.status}
        />
      ))}
    </div>
  );
};
export default Orders;
