import React, { useState } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";

const OrderDetail = ({ showOrder, setShowOrder }) => {
  const handleClose = () => setShowOrder(false);

  return (
    <>
      <Modal
        size="lg"
        show={showOrder}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <h2>Order Detail</h2>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <div className="d-flex">
                <div>
                  <h5 className="title-block">User_ID:</h5>
                </div>
                <div>
                  <h3>U_001</h3>
                </div>
              </div>
              <div className="d-flex">
                <div>
                  <h5 className="title-block">First Name:</h5>
                </div>
                <div>
                  <h3>Peetawit</h3>
                </div>
              </div>

              <div className="d-flex">
                <div>
                  <h5 className="title-block">Telephone:</h5>
                </div>
                <div>
                  <h3>081-615-4177</h3>
                </div>
              </div>

              <div className="d-flex">
                <div>
                  <h5 className="title-block">Address:</h5>
                </div>
                <div>
                  <h3>3380 Don Jackson Lane st. Keaau City Hawaii 96749</h3>
                </div>
              </div>
            </Col>

            <Col md={6}>
              <div className="d-flex">
                <div>
                  <h5 className="title-block">Last Name:</h5>
                </div>
                <div>
                  <h3>Vongchanapibul</h3>
                </div>
              </div>

              <div className="d-flex">
                <div>
                  <h5 className="title-block">Email:</h5>
                </div>
                <div>
                  <h3>peetawit.vong@mail.kmutt.ac.th</h3>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default OrderDetail;
