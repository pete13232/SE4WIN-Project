import { Row, Col, Table, Button, Form, FormControl } from "react-bootstrap";
import { FaRegEdit, FaEdit } from "react-icons/fa";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { ImBin } from "react-icons/im";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./style.css";

const AdminCategory = ({ id }) => {
  const [showName, setShowName] = useState([true, true]);
  const [text, setText] = useState("");
  const [test, setTest] = useState([
    { id: 1, name: "keyboard" },
    {
      id: 2,
      name: "switch",
    }]);
  // useEffect(() => {
  //   // console.log('useEFECT');
  //   setTest([
  //     { id: 1, name: "keyboard" },
  //     {
  //       id: 2,
  //       name: "switch",
  //     },
  //   ]);
  //   setShowName(c);
  //   setShowDelete([true, true]);
  // }, []);
  
  const handleEdit = (index) => {
    setText(test[index].name);
    const newShowName = Array.from({length: showName.length}, i => i = true);
    newShowName[index] = false;
    setShowName(newShowName);
  };

  const handleConfirm = (index) => {
    /// DO SOMETHINH WITH BE
    const newTest = [...test];
    newTest[index].name = text;
    setTest(newTest);
    const newShowName = Array.from({length: showName.length}, i => i = true);
    setShowName(newShowName);
  };

  const handleText = (event) => {
    setText(event.target.value);
  };

  const textFieldShow = (index) => {
    if (showName[index] === true) {
      return <td>{test[index].name}</td>;
    } else {
      return (
        <td>
          <Form>
            <FormControl
              value={text}
              type="text"
              placeholder="put text here"
              onChange={handleText}
            />
          </Form>
        </td>
      );
    }
  };

  const editConfirmButton = (index) => {
    // return <a>{ showName}</a>;
    if (showName[index] === true) {
      return (
        <div className="edit">
          <FaRegEdit onClick={() => handleEdit(index)} />
        </div>
      );
    } else {
      return (
        <div className="check">
          <AiOutlineCheckSquare onClick={() => handleConfirm(index)} />
        </div>
      );
    }
  };

  const deleteAlert = () => {
    Swal.fire({
      position: "top",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "top",
          title: "Deleted!",
          text: "This category has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      {id === "category" && (
        <Col md={10} className="bg-white admin-category">
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
              {test.map((e, index) => {
                return (
                  <tr className="modify" key={index}>
                    <td>{e.id}</td>
                    {textFieldShow(index)}
                    <td>
                      <div className="d-flex gap-3">
                        <div className="edit">{editConfirmButton(index)}</div>
                        <div className="bin">
                          <ImBin onClick={deleteAlert} />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      )}
    </>
  );
};
export default AdminCategory;
