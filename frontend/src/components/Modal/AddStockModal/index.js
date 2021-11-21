import React, { useState } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import "./style.css"

const AddStockModal = ({ showAdd, setShowAdd }) => {
  const handleClose = () => setShowAdd(false);
  return (
    <div>
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
              <h3>P_001</h3>
            </div>
          </div>
          <div className="d-flex">
            <div>
              <h5 className="title-block">Product Name:</h5>
            </div>
            <div>
              <h5>Keychron K4V2</h5>
            </div>
          </div>
          <div className="d-flex">
            <div>
              <h5 className="title-block">Quantity:</h5>
            </div>
            <div>
              <h5>5</h5>
            </div>
          </div>
          <div className="d-flex justify-content-center count">
            <div className="minus">
              <AiFillMinusCircle />
            </div>
            <div>
              <h5 className="total-background mx-2">5</h5>
            </div>
            <div className="plus">
              <AiFillPlusCircle/>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="grey btn-small" onClick={handleClose}>
            Close
          </Button>
          <Button className="green btn-small">Confirm</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default AddStockModal;
