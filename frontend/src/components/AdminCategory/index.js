import React, { useState, useEffect } from "react";
import { Col, Table, Button, Form, FormControl } from "react-bootstrap";
import {
  ADMIN_GET_CATEGORIES,
  GET_CATEGORIES_BY_NAME,
} from "../../Graphql/Queries";
import { useLazyQuery, useQuery } from "@apollo/client";
import AdminCategoryChild from "./AdminCategoryChild";
import AddCategoryModal from "../Modal/AddCategoryModal";
import "./style.css";
import { useForm } from "react-hook-form";

const AdminCategory = ({ id }) => {
  /*--------------------------Query-------------------------------*/
  const { data, refetch } = useQuery(ADMIN_GET_CATEGORIES); // all categories query
  const [categories, setCategories] = useState([]);// categories variable
  const [search, setSearch] = useState("");// search variable
  const { register, handleSubmit } = useForm(); // form variable

  const [getCategories, { data: dataSearch }] = useLazyQuery(
    GET_CATEGORIES_BY_NAME
  ); // searched categories query

  const onSubmit = (submit) => { // when search set search variable
    setSearch(submit.name);
  };

  useEffect(() => { // initial data when data change
    if (search) {
      getCategories({ variables: { name: search } });
    }
    if (data && !search) {
      setCategories(data.AdminCategories);
    } else if (dataSearch) {
      setCategories(dataSearch.AdminCategoriesByName.data);
    }
  }, [data, dataSearch, getCategories, search]);
  /*--------------------------Query-------------------------------*/
  
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false); // Modal show variable

  return (
    <>
      {id === "category" && (
        <Col md={10} className="bg-white admin-category">
          <div className="d-flex align-items-center gap-5">
            <Form
              id="search-form"
              className="search-order my-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl
                type="search"
                placeholder="Search for category"
                className="me-2"
                aria-label="Search"
                {...register("name")}
              />
            </Form>
            {search && (
              <Button
                onClick={() => {
                  setSearch(null);
                  document.getElementById("search-form").reset();
                }}
                className="mx-4 my-3 red btn-small"
              >
                clear
              </Button>
            )}
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
                <th>Picture</th>
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
