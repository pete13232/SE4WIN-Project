import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap";
import {
  ADMIN_GET_CATEGORIES,
  GET_PRODUCT_INFO,
} from "../../../Graphql/Queries";
import { UPDATE_PRODUCT } from "../../../Graphql/Mutations";
import { useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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

  const { data, error } = useQuery(ADMIN_GET_CATEGORIES);
  const [categories, setCategories] = useState();

  useEffect(() => {
    if (data) {
      setCategories(data.categories);
    }
  }, [data]);

  /*------------------------Query--------------------------*/

  /*------------------------Submit--------------------------*/
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const schema = yup.object().shape({
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
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [pictureFile, setPictureFile] = useState("");

  const onSubmit = (submit) => {
    if (pictureFile) {
      // const token = localStorage.getItem("jwtToken") || "";
      let formdata = new FormData();
      formdata.append("file", pictureFile, pictureFile.name);
      axios({
        url: "http://20.212.81.174/upload",
        method: "POST",
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: formdata,
      })
        .then((res) => {
          submit.picURL = res.data.imagePath;
        })
        .catch((error) => {
          const err = error.message;
          Swal.fire({
            title: "Oops! !",
            html: err,
            icon: "error",
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
        });
    }
    else{
      submit.picURL = undefined
    }
    const productId = { id: id };
    if(categories.find(category => category.id === submit.categoryId).name === category )
    {
      submit.categoryId = undefined
    }
    Object.keys(submit).forEach((key) =>
      submit[key] === undefined || submit[key] === "" ? delete submit[key] : {}
    );
    if (Object.keys(submit).length !== 0) {
      submit = Object.assign(productId, submit);
      updateProduct({
        variables: { input: submit },
      })
        .then(() => {
          Swal.fire({
            title: "Update product success!",
            html: "Press Ok to continue",
            icon: "success",
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
          handleClose();
          refetch();
        })
        .catch((error) => {
          const err = error.message;
          Swal.fire({
            title: "Oops! !",
            html: err,
            icon: "error",
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
          
        });
    }
    else{
      handleClose()
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
              {/* <div className="product-image d-flex justify-content-center mb-3">
              <Image src="https://www.gannett-cdn.com/-mm-/05398f80e3bde0326c872a093f3784aeee1c8a90/c=880-323-1833-861/local/-/media/2018/05/14/USATODAY/usatsports/wp-USAT-allthemoms-front1-19975-winnie-the-pooh-day.jpg?auto=webp&format=pjpg&width=1200" />
            </div> */}
              <div className="text-center upload-btn">
                {/* <Button className="btn-medium blue">Upload</Button> */}
                {/*------------------------Pic upload--------------------------*/}
                <label htmlFor="files" className="btn btn-medium blue">
                  Upload receipt
                </label>
                <Form.Control
                  name="picURL"
                  id="files"
                  type="file"
                  // style={{ visibility: "hidden" }}
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
                {/* <Form.Control type="text" /> */}
                <Form.Select name="categoryId" {...register("categoryId")}>
                  {categories?.map((cat) =>
                    cat.name === category ? (
                      <option key={cat.id} value={cat.id} selected>
                        {cat.name}
                      </option>
                    ) : (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
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
