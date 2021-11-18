import React, { useState } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap";

const AddStockModal = ({ showAdd, setShowAdd }) => {
  const handleClose = () => setShowAdd(false);
  return (
    <div>
      <Modal
        size="lg"
        show={showAdd}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <h2>Add Stock</h2>
        </Modal.Header>
        <Modal.Body className="d-flex gap-4 p-5">
          <div>
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
export default AddStockModal;
