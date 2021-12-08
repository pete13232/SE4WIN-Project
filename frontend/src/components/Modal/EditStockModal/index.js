import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { ADMIN_GET_CATEGORIES } from "../../../Graphql/Queries";
import { UPDATE_PRODUCT } from "../../../Graphql/Mutations";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Button, Form } from "react-bootstrap";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

const EditStockModal = ({
  showEdit,
  setShowEdit,
  id,
  name,
  category,
  price,
  desc,
  img,
  stock,
  refetch,
}) => {
  /*------------------------Modal--------------------------*/

  const handleClose = () => setShowEdit(false);

  /*------------------------Modal--------------------------*/

  /*------------------------Query--------------------------*/

  const { data } = useQuery(ADMIN_GET_CATEGORIES); // query categories
  const [categories, setCategories] = useState(); //categories state

  useEffect(() => {
    // initial data when data change
    if (data) {
      setCategories(data.AdminCategories);
    }
  }, [data]);

  /*------------------------Query--------------------------*/

  /*------------------------Submit--------------------------*/
  const [updateProduct] = useMutation(UPDATE_PRODUCT); //update product mutation

  const schema = yup.object().shape({
    // form schema
    name: yup.string().notRequired(),
    categoryId: yup.number().min(0).notRequired(),
    desc: yup.string().notRequired(),
    price: yup
      .number()
      .min(0, "Product price must equal or more than zero")
      .notRequired()
      .transform((value) => (isNaN(value) ? undefined : value))
      .nullable(),
    picURL: yup.mixed().notRequired(),
  });

  const {
    // form variables
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [pictureFile, setPictureFile] = useState(""); // picture file state

  const onSubmit = (submit) => {
    // submit function
    if (pictureFile) {
      // if there is picture file submit
      let formdata = new FormData();
      formdata.append("file", pictureFile, pictureFile.name);
      axios({
        // upload image to http://20.212.81.174/upload
        url: "http://20.212.81.174/upload",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formdata,
      })
        .then((res) => {
          // if upload success
          submit.picURL = res.data.imagePath; // set picURL to image path from axios
        })
        .catch((error) => {
          //if upload fail
          const err = error.message;
          Swal.fire({
            title: "Oops! !",
            html: err,
            icon: "error",
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
        });
    } else {
      //if no picture file submit
      submit.picURL = undefined;
    }
    const productId = { id: id }; // create product id object
    if (
      categories.find((category) => category.id === submit.categoryId).name ===
      category // if submit same category drop down
    ) {
      submit.categoryId = undefined; // category id set to undefined (don't update)
    }
    Object.keys(submit).forEach((key) =>
      submit[key] === undefined || submit[key] === "" ? delete submit[key] : {}
    ); // delete submit object that is not exist
    if (Object.keys(submit).length !== 0) {
      //if there are still have some infomation in submit
      submit = Object.assign(productId, submit); // append proudctId to submit object
      updateProduct({
        //update product to graphQl
        variables: { input: submit },
      })
        .then(() => {
          //if update success
          Swal.fire({
            title: "Update product success!",
            html: "Press OK to continue",
            icon: "success",
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
          handleClose();
          refetch();
        })
        .catch((error) => {
          //if update fail
          const err = error.message;
          Swal.fire({
            title: "Oops! !",
            html: err,
            icon: "error",
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
        });
    } else {
      //if there is no infomation in submit to update
      handleClose();
    }
  };
  /*------------------------Submit--------------------------*/
  return (
    <>
      <Modal
        size="lg"
        show={showEdit}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <h2>New Product</h2>
          </Modal.Header>
          <Modal.Body className="d-flex gap-4 p-5">
            <div>
              <div className="text-center upload-btn">
                {/*------------------------Pic upload--------------------------*/}
                <Form.Control
                  name="picURL"
                  id="files"
                  type="file"
                  {...register("picURL")}
                  onChange={(event) => {
                    setPictureFile(event.target.files[0]);
                  }}
                />
                {/*------------------------Pic upload--------------------------*/}
              </div>
              <p className="errorMessage">{errors["picURL"]?.message}</p>
            </div>
            <div>
              <Form.Group className="d-flex mb-3 align-items-baseline">
                <Form.Label className="title-block">
                  <h5>Name:</h5>
                </Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  placeholder={name}
                  {...register("name")}
                />
                <p className="errorMessage">{errors["name"]?.message}</p>
              </Form.Group>
              <Form.Group className="d-flex mb-3 align-items-baseline">
                <Form.Label className="title-block">
                  <h5>Category:</h5>
                </Form.Label>
                <Form.Select name="categoryId" {...register("categoryId")}>
                  {categories?.map((cat) =>
                    cat.name === category ? (
                      <option key={cat.id} value={cat.id} selected>
                        {cat.name}
                      </option>
                    ) : (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    )
                  )}
                </Form.Select>
                <p className="errorMessage">{errors["categoryId"]?.message}</p>
              </Form.Group>
              <Form.Group className="d-flex mb-3 align-items-baseline">
                <Form.Label className="title-block">
                  <h5>Price:</h5>
                </Form.Label>
                <Form.Control
                  name="price"
                  type="number"
                  min="0"
                  placeholder={price}
                  {...register("price")}
                />
                <p className="errorMessage">{errors["price"]?.message}</p>
              </Form.Group>
              <Form.Group className="d-flex mb-3 align-items-baseline">
                <Form.Label className="title-block">
                  <h5>Quantity:</h5>
                </Form.Label>
                <Form.Control
                  name="stock"
                  type="number"
                  min="0"
                  placeholder={stock}
                  disabled
                  {...register("stock")}
                />
                <p className="errorMessage">{errors["stock"]?.message}</p>
              </Form.Group>
              <Form.Group className="d-flex mb-3 align-items-baseline">
                <Form.Label className="title-block">
                  <h5>Description:</h5>
                </Form.Label>
                <Form.Control
                  name="desc"
                  type="text"
                  as="textarea"
                  placeholder={desc}
                  {...register("desc")}
                />
                <p className="errorMessage">{errors["desc"]?.message}</p>
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="grey btn-small" onClick={handleClose}>
              Close
            </Button>
            <Button className="green btn-small" type="submit">
              Confirm
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
export default EditStockModal;
