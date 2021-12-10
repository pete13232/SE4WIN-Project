import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CREATE_CATEGORY } from "../../../Graphql/Mutations";
import { Modal, Button, Form, Image } from "react-bootstrap";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import "./style.css";

const AddCategoryModal = ({ showCategory, setShowCategory, refetch }) => {
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
    setShowCategory(false);
    document.getElementById("categoryForm").reset();
    setSelectedImage();
  };

  /*------------------------Modal--------------------------*/

  /*------------------------Submit--------------------------*/
  const [createCategory] = useMutation(CREATE_CATEGORY); // create category mutation

  const schema = yup.object().shape({
    //schema of form
    name: yup.string().required("Please enter category name"),
    picURL: yup
      .mixed()
      .test("name", "Please upload category picture", (value) => {
        return value[0] && value[0].name !== "";
      }),
  });

  const {
    // form variable
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [pictureFile, setPictureFile] = useState(""); // picture file state

  const onSubmit = (submit) => {
    // submit function
    let formdata = new FormData();
    formdata.append("file", pictureFile, pictureFile.name);
    axios({
      // upload image to  http://20.212.81.174/upload
      url: "http://20.212.81.174/upload",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formdata,
    })
      .then((res) => {
        // if uplaod success
        const url = "http://20.212.81.174/";
        submit.picURL = url + res.data.imagePath; //submit image path to graphQL
        createCategory({
          //create category in graphql
          variables: { input: submit },
        })
          .then((res) => {// if create success
            var name = res.data.createCategory.name;
            Swal.fire({
              title: "Add new category success!",
              text: "Add " + name + " to new category",
              icon: "success",
              allowOutsideClick: false,
              allowEscapeKey: false,
            });
            handleClose();
            refetch();
          })
          .catch((error) => {//if create category fail
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
      .catch((error) => {//if upload fail
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
        show={showCategory}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Form onSubmit={handleSubmit(onSubmit)} id="categoryForm">
          <Modal.Header closeButton>
            <h2>New Category</h2>
          </Modal.Header>
          <Modal.Body className="d-flex gap-4 p-5">
            <div>
              {selectedImage && (
                <div className="product-image d-flex justify-content-center mb-3">
                  <Image src={URL.createObjectURL(selectedImage)} />
                </div>
              )}
              <div className="text-center upload-btn">
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
              <p className="errorMessage">{errors["picURL"]?.message}</p>
            </div>
            <div>
              <Form.Group className="d-flex align-items-baseline">
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
export default AddCategoryModal;
