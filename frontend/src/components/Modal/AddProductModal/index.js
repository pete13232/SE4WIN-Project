import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ADD_PRODUCT } from "../../../Graphql/Mutations";
import { ADMIN_GET_CATEGORIES } from "../../../Graphql/Queries";
import { UPDATE_STOCK } from "../../../Graphql/Mutations";
import { Modal, Button, Form, Image } from "react-bootstrap";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import "./style.css";

const AddProductModal = ({ showProduct, setShowProduct, refetch }) => {
  /*------------------------ Preview Image --------------------------*/
  const [selectedImage, setSelectedImage] = useState();

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  /*------------------------ Preview Image --------------------------*/
  /*------------------------Modal--------------------------*/

  const handleClose = () => {
    document.getElementById("addProductForm").reset();
    setShowProduct(false);
    clearErrors();
  };

  /*------------------------Modal--------------------------*/

  /*------------------------Query--------------------------*/

  const { data } = useQuery(ADMIN_GET_CATEGORIES); //query categories
  const [categories, setCategories] = useState();

  useEffect(() => {
    // initial data when data change
    if (data) {
      setCategories(data.AdminCategories);
    }
  }, [data]);

  /*------------------------Query--------------------------*/

  /*------------------------Submit--------------------------*/
  const [addProduct] = useMutation(ADD_PRODUCT); // add product mutation
  const [updateStock] = useMutation(UPDATE_STOCK); //update stock mutation

  const schema = yup.object().shape({
    //schema of form
    name: yup.string().required("Please enter product name"),
    categoryId: yup
      .number()
      .required("Please select product category")
      .min(0)
      .typeError("Please select product category"),
    desc: yup.string().required("Please enter product description"),
    price: yup
      .number()
      .required("Please enter product price")
      .min(0, "Product price must equal or more than zero")
      .typeError("Please enter product price"),
    picURL: yup
      .mixed()
      .test("name", "Please upload product picture", (value) => {
        return value[0] && value[0].name !== "";
      }),
    stock: yup
      .number()
      .required("Please enter product quantity")
      .min(0, "Product quantity must equal or more than zero")
      .typeError("Please enter product quantity"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    //form variables
    resolver: yupResolver(schema),
  });

  const [pictureFile, setPictureFile] = useState(""); // picture file state

  const onSubmit = (submit) => {
    // submit function
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
        // if upload image success
        const stock = submit.stock;
        const url = "http://20.212.81.174/";
        delete submit.stock;
        submit.picURL = url + res.data.imagePath; //upload image path to graphQL
        addProduct({
          // add product to graphQL
          variables: { input: submit },
        })
          .then((res) => {
            //if add product success
            if (stock && stock > 0) {
              const id = res.data.createProduct.id;
              updateStock({
                //update stock to graphQL
                variables: { quantity: stock, productId: id },
              }).catch((error) => {
                // if update stock fail
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
            Swal.fire({
              title: "Add new product success!",
              html: "Press OK to continue",
              icon: "success",
              allowOutsideClick: false,
              allowEscapeKey: false,
            });
            handleClose();
            refetch();
          })
          .catch((error) => {
            //if add product fail
            const err = error.message;
            Swal.fire({
              title: "Oops! !",
              html: err,
              icon: "error",
              allowOutsideClick: false,
              allowEscapeKey: false,
            });
          });
      })
      .catch((error) => {
        //if upload image fail
        const err = error.message;
        Swal.fire({
          title: "Oops! !",
          html: err,
          icon: "error",
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      });
  };

  /*------------------------Submit--------------------------*/

  return (
    <>
      <Modal
        size="lg"
        show={showProduct}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        id="addProductModal"
      >
        <Form onSubmit={handleSubmit(onSubmit)} id="addProductForm">
          <Modal.Header closeButton>
            <h2>New Product</h2>
          </Modal.Header>
          <Modal.Body className="d-flex gap-4 p-5">
            <div>
              {selectedImage && (
                <div className="product-image d-flex justify-content-center mb-3">
                  <Image src={URL.createObjectURL(selectedImage)} />
                </div>
              )}
              <div className="text-center upload-btn">
                {/*------------------------Pic upload--------------------------*/}
                <Form.Control
                  name="picURL"
                  id="files"
                  type="file"
                  {...register("picURL")}
                  onChange={(event) => {
                    setPictureFile(event.target.files[0]);
                    imageChange(event);
                  }}
                />
                {/*------------------------Pic upload--------------------------*/}
              </div>
              {errors["picURL"]?.message && (
                <p className="errorMessage text-end">
                  {errors["picURL"]?.message}
                </p>
              )}
            </div>
            <div>
              <Form.Group
                className={
                  errors["name"]?.message
                    ? "d-flex align-items-baseline"
                    : "d-flex mb-3 align-items-baseline"
                }
              >
                <Form.Label className="title-block">
                  <h5>Name:</h5>
                </Form.Label>
                <Form.Control name="name" type="text" {...register("name")} />
              </Form.Group>
              {errors["name"]?.message && (
                <p className="errorMessage text-end">
                  {errors["name"]?.message}
                </p>
              )}
              <Form.Group
                className={
                  errors["categoryId"]?.message
                    ? "d-flex align-items-baseline"
                    : "d-flex mb-3 align-items-baseline"
                }
              >
                <Form.Label className="title-block">
                  <h5>Category:</h5>
                </Form.Label>
                <Form.Select name="categoryId" {...register("categoryId")}>
                  <option>Select Category</option>
                  {categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              {errors["categoryId"]?.message && (
                <p className="errorMessage text-end">
                  {errors["categoryId"]?.message}
                </p>
              )}
              <Form.Group
                className={
                  errors["price"]?.message
                    ? "d-flex align-items-baseline"
                    : "d-flex mb-3 align-items-baseline"
                }
              >
                <Form.Label className="title-block">
                  <h5>Price:</h5>
                </Form.Label>
                <Form.Control
                  name="price"
                  type="number"
                  min="0"
                  {...register("price")}
                />
              </Form.Group>
              {errors["price"]?.message && (
                <p className="errorMessage text-end">
                  {errors["price"]?.message}
                </p>
              )}
              <Form.Group
                className={
                  errors["stock"]?.message
                    ? "d-flex align-items-baseline"
                    : "d-flex mb-3 align-items-baseline"
                }
              >
                <Form.Label className="title-block">
                  <h5>Quantity:</h5>
                </Form.Label>
                <Form.Control
                  name="stock"
                  type="number"
                  min="0"
                  {...register("stock")}
                />
              </Form.Group>
              {errors["stock"]?.message && (
                <p className="errorMessage text-end">
                  {errors["stock"]?.message}
                </p>
              )}
              <Form.Group
                className={
                  errors["desc"]?.message
                    ? "d-flex align-items-baseline"
                    : "d-flex mb-3 align-items-baseline"
                }
              >
                <Form.Label className="title-block">
                  <h5>Description:</h5>
                </Form.Label>
                <Form.Control
                  name="desc"
                  type="text"
                  as="textarea"
                  {...register("desc")}
                />
              </Form.Group>
              {errors["desc"]?.message && (
                <p className="errorMessage text-end">
                  {errors["desc"]?.message}
                </p>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="grey btn-small"
              onClick={() => {
                handleClose();
                setSelectedImage("");
              }}
            >
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
export default AddProductModal;
