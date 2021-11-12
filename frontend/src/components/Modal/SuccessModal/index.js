import { FaCheckCircle } from "react-icons/fa";
import { BsFillXCircleFill } from "react-icons/bs";
import { Modal, Button, Image, Row } from "react-bootstrap";
import React, { useState } from "react";
import "./style.css";

const SuccessModal = ({ showSuccess, setShowSuccess, text}) => {
  //   const [showSuccess, setShowSuccess] = useState(showSuccess);

  const handleClose = () => setShowSuccess(false);
  const handleShow = () => setShowSuccess(true);
  const [icon, setIcon] = useState();
//   const icons = {
//     success: setIcon(<FaCheckCircle />),
//     fail: setIcon(<BsFillXCircleFill />),
//   };
  return (
    <div>
      <Modal size="md" show={showSuccess} onHide={handleClose} keyboard={false}>
        <Modal.Body>
          <Row className="gap-3">
            <div className="success-text text-center">Success</div>
            <div className="confirm-image d-flex justify-content-center">
              <FaCheckCircle/>
            </div>
            <div className="text-center mt-3">
              <h5>{text}</h5>
            </div>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default SuccessModal;
