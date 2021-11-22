import { Row, Col, Table, Button, Form, FormControl } from "react-bootstrap";
import { FaRegEdit, FaEdit } from "react-icons/fa";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { ImBin } from "react-icons/im";
import React, { useState } from "react";

const AdminCategory = ({ id }) => {
  const [choose, setChoose] = useState(true);
  const [confirm, setConfirm] = useState(true);
  const [text, setText] = useState("");
  const handleEdit = () => {
    setChoose(false);
    setConfirm(false);
  };

  const handleConfirm = () => {
    setConfirm(true);
    setChoose(true);
  };

  //   const handleText = (event) => {
  //     console.log(event.nativeEvent.data);
  //   };

  //   const handleText = (event) => {
  //       setText(event.nativeEvent.data)
  //   }

//   const handleText = (event) => {
//     setText(event.nativeEvent.data)
//   };

  const switchShow = () => {
    if (choose === true) {
      return <td>Keyboard</td>;
    } else {
      return (
        <td>
          <Form>
            <FormControl type="text" placeholder="put text here"/>
          </Form>
        </td>
      );
    }
  };

  const switchConfirm = () => {
    if (confirm === true) {
      return (
        <div className="edit">
          <FaRegEdit onClick={handleEdit} />
        </div>
      );
    } else {
      return (
        <div className="check">
          <AiOutlineCheckSquare
            onClick={handleConfirm}
          />
        </div>
      );
    }
  };

  return (
    <>
      {id === "category" && (
        <Col md={10} className="bg-white">
          <div className="d-flex gap-5">
            <Form className="search-order my-3">
              <FormControl
                type="search"
                placeholder="Search for category"
                className="me-2"
                aria-label="Search"
              />
            </Form>
            <Form className="search-order my-3 d-flex">
              <FormControl
                type="text"
                placeholder="Add new category"
                className="me-2"
              />
              <Button type="submit" className="btn-medium blue">
                +New
              </Button>
            </Form>
          </div>
          <Table striped bordered hover className="px-1">
            <thead className="table-head">
              <tr className="text-center">
                <th>Category_ID</th>
                <th>Category_Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr className="modify">
                <td>C_001</td>
                {switchShow()}
                <td>
                  <div className="d-flex gap-3">
                    <div className="edit">{switchConfirm()}</div>
                    <div className="bin">
                      <ImBin />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      )}
    </>
  );
};
export default AdminCategory;
