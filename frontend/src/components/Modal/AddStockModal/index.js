import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_STOCK } from "../../../Graphql/Mutations";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import "./style.css";

const AddStockModal = ({
  showAdd,
  setShowAdd,
  ProductId,
  ProductName,
  ProductQuantity,
  refetch,
}) => {
  /*-----------------------Modal--------------------------------*/
  const handleClose = () => setShowAdd(false);
  /*-----------------------Modal--------------------------------*/

  /*-----------------------Quantity State--------------------------------*/
  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const handleDecrement = () => {
    if (count - 1 >= -ProductQuantity) {
      setCount((prevCount) => prevCount - 1);
    }
  };
  /*-----------------------Quantity State--------------------------------*/

  /*-----------------------------Submit--------------------------------*/
  const [updateStock] = useMutation(UPDATE_STOCK); // update stock mutation
  const onSubmit = (quantity) => {
    if (quantity !== 0) {//if submit by increase / decrease stock by 0
      updateStock({// update stock to graphQL
        variables: { quantity: quantity, productId: ProductId },
      })
        .then(() => {// if update stock success
          handleClose();
          Swal.fire({
            title: "Add new product success!",
            html: "Press OK to continue",
            icon: "success",
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
          refetch();
        })
        .catch((error) => {// if update stock fail
          const err = error.message;
          Swal.fire({
            title: "Oops! !",
            html: err,
            icon: "error",
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
        });
    } else {
      handleClose();// close Modal
    }
  };
  /*-----------------------------Submit--------------------------------*/
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
