import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { UPDATE_CATEGORY } from "../../../Graphql/Mutations";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Button, Form, Image } from "react-bootstrap";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import "./style.css";

const EditCategoryModal = ({
  showEditCategory,
  setShowEditCategory,
  categoryId,
  categoryName,
  refetch,
}) => {
  /*------------------------ Preview Image --------------------------*/
  const [selectedImage, setSelectedImage] = useState();

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  /*------------------------Modal--------------------------*/

  const handleClose = () => {
    setShowEditCategory(false);
    // document.getElementById("categoryForm").reset();
  };

  /*------------------------Modal--------------------------*/

  /*------------------------Submit--------------------------*/
  const [updateCategory] = useMutation(UPDATE_CATEGORY);

  const schema = yup.object().shape({
    name: yup.string().notRequired(),
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
    } else {
      submit.picURL = undefined;
    }
    const categorytId = { id: categoryId };
    Object.keys(submit).forEach((key) =>
      submit[key] === undefined || submit[key] === "" ? delete submit[key] : {}
    );
    if (Object.keys(submit).length !== 0) {
      submit = Object.assign(categorytId, submit);
      updateCategory({
        variables: { input: submit },
      })
        .then(() => {
          Swal.fire({
            title: "Update category success!",
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
    } else {
      handleClose();
    }
  };

  /*------------------------Submit--------------------------*/

  return (
    <>
      <Modal
        size="lg"
        show={showEditCategory}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Form onSubmit={handleSubmit(onSubmit)} id="categoryForm">
          <Modal.Header closeButton>
            <h2>Edit Category</h2>
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
              <p className="errorMessage">{errors["picURL"]?.message}</p>
            </div>
            <div>
              <Form.Group className="d-flex mb-3 align-items-baseline">
                <Form.Label className="title-block">
                  <h5>Name:</h5>
                </Form.Label>
                <Form.Control
                  placeholder={categoryName}
                  name="name"
                  type="text"
                  {...register("name")}
                />
                <p className="errorMessage">{errors["name"]?.message}</p>
              </Form.Group>
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
export default EditCategoryModal;
