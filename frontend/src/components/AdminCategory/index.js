import React, { useState, useEffect } from "react";
import { Col, Table, Button, Form, FormControl } from "react-bootstrap";
import { ADMIN_GET_CATEGORIES } from "../../Graphql/Queries";
import { useQuery } from "@apollo/client";
import AdminCategoryChild from "./AdminCategoryChild";
import AddCategoryModal from "../Modal/AddCategoryModal";
import "./style.css";

const AdminCategory = ({ id }) => {
  /*--------------------------Query-------------------------------*/
  const { data, refetch } = useQuery(ADMIN_GET_CATEGORIES);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data.AdminCategories);
    }
  }, [data]);
  /*--------------------------Query-------------------------------*/
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

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
