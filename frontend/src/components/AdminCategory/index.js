import React, { useState, useEffect } from "react";
import { Col, Table, Button, Form, FormControl } from "react-bootstrap";
import { ADMIN_GET_CATEGORIES } from "../../Graphql/Queries";
import { useQuery } from "@apollo/client";
import AdminCategoryChild from "./AdminCategoryChild";
import AddCategoryModal from "../Modal/AddCategoryModal";
import "./style.css";

const AdminCategory = ({ id }) => {
  /*--------------------------Query-------------------------------*/
  const { data, error, refetch } = useQuery(ADMIN_GET_CATEGORIES);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data.AdminCategories);
    }
  }, [data]);
  /*--------------------------Query-------------------------------*/
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showName, setShowName] = useState([true, true]);
  const [text, setText] = useState("");
  const [test, setTest] = useState([
    { id: 1, name: "keyboard" },
    {
      id: 2,
      name: "switch",
    },
  ]);
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
    const newShowName = Array.from(
      { length: showName.length },
      (i) => (i = true)
    );
    newShowName[index] = false;
    setShowName(newShowName);
  };

  const handleConfirm = (index) => {
    /// DO SOMETHINH WITH BE
    const newTest = [...test];
    newTest[index].name = text;
    setTest(newTest);
    const newShowName = Array.from(
      { length: showName.length },
      (i) => (i = true)
    );
    setShowName(newShowName);
  };

  const handleText = (event) => {
    setText(event.target.value);
  };

  // const textFieldShow = (index) => {
  //   if (showName[index] === true) {
  //     return <td>{test[index].name}</td>;
  //   } else {
  //     return (
  //       <td>
  //         <Form>
  //           <FormControl
  //             value={text}
  //             type="text"
  //             placeholder="put text here"
  //             onChange={handleText}
  //           />
  //         </Form>
  //       </td>
  //     );
  //   }
  // };

  // const editConfirmButton = (index) => {
  //   // return <a>{ showName}</a>;
  //   if (showName[index] === true) {
  //     return (
  //       <div className="edit">
  //         <FaRegEdit onClick={() => handleEdit(index)} />
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className="check">
  //         <AiOutlineCheckSquare onClick={() => handleConfirm(index)} />
  //       </div>
  //     );
  //   }
  // };

  return (
    <>
      {id === "category" && (
        <Col md={10} className="bg-white admin-category">
          <div className="d-flex align-items-center gap-5">
            <Form className="search-order my-3">
              <FormControl
                type="search"
                placeholder="Search for category"
                className="me-2"
                aria-label="Search"
              />
            </Form>
            <Button
              type="submit"
              className="btn-medium blue"
              onClick={() => {
                setShowAddCategoryModal(true);
              }}
            >
              +New
            </Button>
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
              {categories.map((category) => (
                <AdminCategoryChild
                  key={category.id}
                  id={category.id}
                  categoryName={category.name}
                  picURL={category.picURL}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </Table>
        </Col>
      )}
      <AddCategoryModal
        showCategory={showAddCategoryModal}
        setShowCategory={setShowAddCategoryModal}
        refetch={refetch}
      />
    </>
  );
};
export default AdminCategory;
