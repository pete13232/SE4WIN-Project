import { Modal, Button, Image, Row } from "react-bootstrap";
import React, { useState } from "react";
import ButtonCustom from "../../ButtonCustom";
import SuccessModal from "../SuccessModal";
import { FaEdit } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillXCircleFill } from "react-icons/bs";
import "./style.css";

const ProductModal = ({text,space,size}) => {
  const [show, setShow] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button className={`${space}`} onClick={handleShow}>
        {text}
      </Button>

      <Modal
        size={size}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <h2>Confirmation</h2>
        </Modal.Header>
        <Modal.Body>
          <Row className="gap-3">
            <div className="confirm-image d-flex justify-content-center">
              <Image src="https://www.gannett-cdn.com/-mm-/05398f80e3bde0326c872a093f3784aeee1c8a90/c=880-323-1833-861/local/-/media/2018/05/14/USATODAY/usatsports/wp-USAT-allthemoms-front1-19975-winnie-the-pooh-day.jpg?auto=webp&format=pjpg&width=1200" />
            </div>
            <div className="d-flex align-items-center">
              <div className="title-block d-flex align-items-center justify-content-end">
                <h5>Product:</h5>
              </div>
              <div className="ms-4 d-flex align-items-center justify-content-center">
                <h3>
                  Keychron K3 Ultra-slim Wireless Mechanical Keyboard (Version2)
                </h3>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <div className="title-block d-flex align-items-center justify-content-end">
                <h5>Quantity:</h5>
              </div>
              <div className="ms-4 d-flex align-items-center justify-content-center quantity-background">
                <h3>3</h3>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <div className="title-block d-flex align-items-center justify-content-end">
                <h5>TotalPricey:</h5>
              </div>
              <div className="ms-4 d-flex align-items-center justify-content-center total-background">
                <h3>$138</h3>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <div className="title-block d-flex align-items-center justify-content-end">
                <h5>Delivery address:</h5>
              </div>
              <div className="ms-4 d-flex align-items-center justify-content-center address-background">
                <h3>
                  126 Pracha Uthit Rd., Bang Mod, Thung Khru, Bangkok 10140,
                  Thailand.
                </h3>
                {/* <span className="pe-3">
                  <a href="#">
                    <FaEdit />
                  </a>
                </span> */}
              </div>
            </div>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button className="grey btn-small" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className="green btn-small"
            onClick={() => {
              setShowSuccess(true);
              handleClose();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <SuccessModal showSuccess={showSuccess} setShowSuccess={setShowSuccess} text="Order Confirmed"/>
    </div>
  );
};
export default ProductModal;
