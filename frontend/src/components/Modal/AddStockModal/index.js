import React, { useState } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import Swal from "sweetalert2";
import "./style.css";
import { useMutation } from "@apollo/client";
import { UPDATE_STOCK } from "../../../Graphql/Mutations";
import { useHistory } from "react-router-dom";

const AddStockModal = ({
  showAdd,
  setShowAdd,
  ProductId,
  ProductName,
  ProductQuantity,
  refetch,
}) => {
  const [count, setCount] = useState(0);
  const handleClose = () => setShowAdd(false);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  const confirmAlert = () => {
    Swal.fire({
      position: "top",
      title: "Success",
      text: "Add stock success",
      icon: "success",
    });
  };

  const [updateStock] = useMutation(UPDATE_STOCK);
  const history = useHistory();

  const onSubmit = (quantity) => {
    if (quantity !== 0) {
      updateStock({
        variables: { quantity: quantity, productId: ProductId },
      })
        .then(() => {
          handleClose();
          Swal.fire({
            title: "Add new product success!",
            html: "Press Ok to continue",
            icon: "success",
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
          refetch();
        })
        .catch((error) => {
          const err = error.message;
          Swal.fire({
            title: "Oops! !",
            html: err,
            icon: "error",
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
        });
    }else{
      handleClose();
    }
  };

  return (
    <>
      <Modal
        size="md"
        show={showAdd}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <h2>Add Stock</h2>
        </Modal.Header>
        <Modal.Body className="align-self-center my-2">
          <div className="d-flex">
            <div>
              <h5 className="title-block">Product ID:</h5>
            </div>
            <div>
              <h3>{ProductId}</h3>
            </div>
          </div>
          <div className="d-flex">
            <div>
              <h5 className="title-block">Product Name:</h5>
            </div>
            <div>
              <h5>{ProductName}</h5>
            </div>
          </div>
          <div className="d-flex">
            <div>
              <h5 className="title-block">Quantity:</h5>
            </div>
            <div>
              <h5>{ProductQuantity}</h5>
            </div>
          </div>
          <div className="d-flex justify-content-center count">
            <div className="minus">
              <AiFillMinusCircle onClick={handleDecrement} />
            </div>
            <div>
              <h5 className="total-background mx-2">{count}</h5>
            </div>
            <div className="plus">
              <AiFillPlusCircle onClick={handleIncrement} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="grey btn-small" onClick={handleClose}>
            Close
          </Button>
          <Button
            className="green btn-small"
            onClick={() => {
              onSubmit(count);
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddStockModal;