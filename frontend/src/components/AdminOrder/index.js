import {
  Col,
  Row,
  Button,
  Table,
  Form,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import { AiFillPicture, AiOutlineCheckSquare } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import React, { useState } from "react";
import OrderDetail from "../Modal/OrderDetail";
import "./style.css";

const AdminOrder = ({ id }) => {
  const [edit, setEdit] = useState(true);
  const [confirm, setConfirm] = useState(true);
  const [choose, setChoose] = useState(true);
  const [status, setStatus] = useState("not paid");
  const [showOrder, setShowOrder] = useState(false);

  const handleEdit = () => {
    setEdit(false);
    setConfirm(false);
    setChoose(false);
  };

  const handleConfirm = () => {
    setEdit(true);
    setConfirm(true);
    setChoose(true);
  };

  const changeStatus = (event) => {
    setStatus(event.target.innerText);
  };

  const buttonStatus = () => {
    if (status === "Pending") {
      return (
        <Button className="yellow btn-small text-black" disabled>
          {status}
        </Button>
      );
    } else if (status === "Success") {
      return (
        <Button className="green btn-small text-black" disabled>
          {status}
        </Button>
      );
    } else if (status === "Failed") {
      return (
        <Button className="red btn-small text-black" disabled>
          {status}
        </Button>
      );
    } else {
      return (
        <Button className="grey btn-small text-black" disabled>
          {status}
        </Button>
      );
    }
  };

  const switchShow = () => {
    if (choose === true) {
      return buttonStatus();
    } else {
      return (
        <Dropdown drop="end">
          <Dropdown.Toggle id="dropdown-basic" className="btn-small grey">
            {status}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              href="#/action-1"
              className="pending"
              onClick={changeStatus}
            >
              Pending
            </Dropdown.Item>
            <Dropdown.Item
              href="#/action-3"
              className="success"
              onClick={changeStatus}
            >
              Success
            </Dropdown.Item>
            <Dropdown.Item
              href="#/action-3"
              className="failed"
              onClick={changeStatus}
            >
              Failed
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }
  };

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
            <tbody>
              <tr className="modify">
                <td>O_001</td>
                <td
                  onClick={() => {
                    setShowOrder(true);
                  }}
                  className="order-detail"
                >
                  P_001
                </td>
                <td>U_001</td>
                <td>Puthabucha44...</td>
                <td>Keychron K4V2</td>
                <td>1</td>
                <td>4389 B.</td>
                <td className="text-center">
                  <AiFillPicture />
                </td>
                <td className="d-flex gap-2">
                  {switchShow()}

                  {confirm ? (
                    <div className="edit">
                      <FaRegEdit onClick={handleEdit} />
                    </div>
                  ) : (
                    <div className="check">
                      <AiOutlineCheckSquare onClick={handleConfirm} />
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      )}

      {/* Modal */}
      <OrderDetail showOrder={showOrder} setShowOrder={setShowOrder} />
    </>
  );
};
export default AdminOrder;
