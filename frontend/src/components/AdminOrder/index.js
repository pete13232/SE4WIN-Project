import { useState, useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { Col, Table, Form, FormControl } from "react-bootstrap";
import { ADMIN_GET_ORDERS, ADMIN_SEARCH_ORDERS } from "../../Graphql/Queries";
import AdminOrderChild from "./AdminOrderChild";
import "./style.css";
import { useForm } from "react-hook-form";
import Button from "@restart/ui/esm/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
const AdminOrder = ({ id }) => {
  /*-------------------------Query----------------------------- */
  const { data, refetch } = useQuery(ADMIN_GET_ORDERS);
  const [orders, setOrders] = useState();
  const [search, setSearch] = useState();

  const [getOrders, { data: dataSearch }] = useLazyQuery(ADMIN_SEARCH_ORDERS);
  const schema = yup.object().shape({
    orderId: yup
      .number("Please insert number of order ID")
      .integer("Please insert number of order ID")
      .min(1, "Please insert number of order ID")
      .typeError("Please insert number of order ID")
      .notRequired()
      .nullable(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (submit) => {
    setSearch(submit.orderId);
  };

  useEffect(() => {
    if (search) {
      getOrders({ variables: { id: Number(search) } })
    }
    if (data && !search) {
      setOrders(data.orders);
    } else if (dataSearch) {
      setOrders(dataSearch.order);
    }
    else{
      setOrders()
    }
  }, [data, dataSearch, getOrders, search]);
  /*-------------------------Query----------------------------- */
  console.log(dataSearch)
  console.log(orders)
  return (
    <>
      {id === "order" && (
        <Col md={10} className="bg-white admin-order">
          <div className="d-flex align-items-center gap-1">
            <Form
              id="search-form"
              className="search-order my-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl
                type="search"
                placeholder="Search for order"
                className="me-2"
                aria-label="Search"
                {...register("orderId")}
                onBlur={() => {
                  clearErrors();
                }}
              />
              <p className="errorMessage text-start">
                {errors["orderId"]?.message}
              </p>
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
          </div>
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
            {orders?.length > 1 &&
              orders?.map((order) => (
                <AdminOrderChild
                  key={order.id}
                  orderId={order.id}
                  productId={order.product.id}
                  userId={order.user.id}
                  address={order.orderAddress}
                  product={order.product.name}
                  quantity={order.quantity}
                  price={order.netPrice}
                  receipt={order.receiptURL}
                  status={order.status}
                  refetch={refetch}
                />
              ))}
            {orders && orders.length === undefined && (
              <AdminOrderChild
                key={orders.id}
                orderId={orders.id}
                productId={orders.product.id}
                userId={orders.user.id}
                address={orders.ordersAddress}
                product={orders.product.name}
                quantity={orders.quantity}
                price={orders.netPrice}
                receipt={orders.receiptURL}
                status={orders.status}
                refetch={refetch}
              />
            )}
          </Table>
        </Col>
      )}
    </>
  );
};
export default AdminOrder;
