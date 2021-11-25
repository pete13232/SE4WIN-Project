import { useState, useEffect } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap";
import "./style.css";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ADD_PRODUCT } from "../../../Graphql/Mutations";
import { ADMIN_GET_CATEGORIES } from "../../../Graphql/Queries";
import axios from "axios";
import Swal from "sweetalert2";

const AddProductModal = ({ showProduct, setShowProduct }) => {
  /*------------------------Modal--------------------------*/

  const handleClose = () => setShowProduct(false);

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
  const [addProduct] = useMutation(ADD_PRODUCT);

  const schema = yup.object().shape({
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
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [pictureFile, setPictureFile] = useState("");

  const onSubmit = (submit) => {
    // const token = localStorage.getItem("jwtToken") || "";
    let formdata = new FormData();
    formdata.append("file", pictureFile, pictureFile.name);
    // console.log(pictureFile.name);
    // console.log(formdata);
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
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // axios
    //   .post("http://20.212.81.174/upload", formdata, {})
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // addProduct({
    //   variables: { input: submit },
    // })
    //   .then(() => {
    //     Swal.fire({
    //       title: "Add new product success!",
    //       html: "Press Ok to continue",
    //       icon: "success",
    //       allowOutsideClick: false,
    //       allowEscapeKey: false,
    //     });
    //   })
    //   .catch((error) => {
    //     const err = error.message;
    //     Swal.fire({
    //       title: "Oops! !",
    //       html: err,
    //       icon: "error",
    //       allowOutsideClick: false,
    //       allowEscapeKey: false,
    //     });
    //   });
  };

  /*------------------------Submit--------------------------*/

  // console.log(errors);
  // console.log(pictureFile);
  return (
    <>
      <Modal
        size="lg"
        show={showProduct}
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
                  // {...register("picURL")}
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
                <Form.Control name="name" type="text" {...register("name")} />
                <p className="errorMessage">{errors["name"]?.message}</p>
              </Form.Group>
              <Form.Group className="d-flex mb-3 align-items-baseline">
                <Form.Label className="title-block">
                  <h5>Category:</h5>
                </Form.Label>
                {/* <Form.Control type="text" /> */}
                <Form.Select name="categoryId" {...register("categoryId")}>
                  <option>Select Category</option>
                  {categories?.map((category) => (
                    <option value={category.id}>{category.name}</option>
                  ))}
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
export default AddProductModal;
