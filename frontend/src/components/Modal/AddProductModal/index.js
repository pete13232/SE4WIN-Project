import React, { useState } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap";
import "./style.css";

const AddProductModal = ({ showProduct, setShowProduct }) => {
  const handleClose = () => setShowProduct(false);

  return (
    <div>
      <Modal
        size="lg"
        show={showProduct}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <h2>New Product</h2>
        </Modal.Header>
        <Modal.Body className="d-flex gap-4 p-5">
          <div>
            <div className="product-image d-flex justify-content-center mb-3">
              <Image src="https://www.gannett-cdn.com/-mm-/05398f80e3bde0326c872a093f3784aeee1c8a90/c=880-323-1833-861/local/-/media/2018/05/14/USATODAY/usatsports/wp-USAT-allthemoms-front1-19975-winnie-the-pooh-day.jpg?auto=webp&format=pjpg&width=1200" />
            </div>
            <div className="text-center upload-btn">
              {/* <Button className="btn-medium blue">Upload</Button> */}
              <label htmlFor="files" className="btn btn-medium blue">
                Upload receipt
              </label>
              <input id="files" type="file" style={{ visibility: "hidden" }} />
            </div>
          </div>
          <div>
            <Form>
              <Form.Group className="d-flex mb-3 align-items-baseline">
                <Form.Label className="title-block">
                  <h5>Name:</h5>
                </Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group className="d-flex mb-3 align-items-baseline">
                <Form.Label className="title-block">
                  <h5>Category:</h5>
                </Form.Label>
                {/* <Form.Control type="text" /> */}
                <Form.Select>
                  <option>Select Category</option>
                  <option value="Keyboard">Keyboard</option>
                  <option value="Accessory">Accessory</option>
                  <option value="Switch">Switch</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="d-flex mb-3 align-items-baseline">
                <Form.Label className="title-block">
                  <h5>Price:</h5>
                </Form.Label>
                <Form.Control type="number" />
              </Form.Group>
              <Form.Group className="d-flex mb-3 align-items-baseline">
                <Form.Label className="title-block">
                  <h5>Quantity:</h5>
                </Form.Label>
                <Form.Control type="number" />
              </Form.Group>
              <Form.Group className="d-flex mb-3 align-items-baseline">
                <Form.Label className="title-block">
                  <h5>Description:</h5>
                </Form.Label>
                <Form.Control type="text" as="textarea" />
              </Form.Group>
            </Form>
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
export default AddProductModal;
