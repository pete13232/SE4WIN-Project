import { Row, Col, Form, Image } from "react-bootstrap";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UPLOAD_RECEIPT } from "../../../Graphql/Mutations";
import axios from "axios";
import * as yup from "yup";
import Swal from "sweetalert2";
import Button from "@restart/ui/esm/Button";

const Order = ({
  id,
  pic,
  name,
  quantity,
  netPrice,
  address,
  status,
  refetch,
}) => {
  const statusFuction = (status) => {
    let st = "";
    if (status === "AWAITING") {
      st = "status-awaiting";
    } else if (status === "PENDING") {
      st = "status-pending";
    } else if (status === "SUCCESS") {
      st = "status-success";
    } else if (status === "FAIL") {
      st = "status-fail";
    }
    return st;
  };

  /*------------------------Submit--------------------------*/
  const [uploadReceipt] = useMutation(UPLOAD_RECEIPT);
  const schema = yup.object().shape({
    receiptURL: yup
      .mixed()
      .test("name", "Please upload receiptURL picture", (value) => {
        return value[0] && value[0].name !== "";
      }),
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
    if (status === "PENDING") {
      Swal.fire({
        position: "top",
        title: "Are you sure you want to \n re-upload receipt?",
        text: "Your current receipt will be replace",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          let formdata = new FormData();
          formdata.append("file", pictureFile, pictureFile.name);
          axios({
            url: "http://20.212.81.174/upload",
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            data: formdata,
          })
            .then((res) => {
              submit.receiptURL = res.data.imagePath;
              uploadReceipt({
                variables: { orderId: id, receiptURL: submit.receiptURL },
              }).then(() => {
                Swal.fire({
                  title: "Add new product success!",
                  html: "Press Ok to continue",
                  icon: "success",
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                });
                refetch();
              });
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
      });
    } else {
      let formdata = new FormData();
      formdata.append("file", pictureFile, pictureFile.name);
      axios({
        url: "http://20.212.81.174/upload",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formdata,
      })
        .then((res) => {
          submit.receiptURL = res.data.imagePath;
          uploadReceipt({
            variables: { orderId: id, receiptURL: submit.receiptURL },
          }).then(() => {
            Swal.fire({
              title: "Add new product success!",
              html: "Press Ok to continue",
              icon: "success",
              allowOutsideClick: false,
              allowEscapeKey: false,
            });
            refetch();
          });
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
  };

  /*------------------------Submit--------------------------*/
  return (
    <>
      <Row className="d-flex mt-3 bg-white order-container gx-0">
        <Col md={4} className="d-flex justify-content-center order-image">
          <div>
            <Image src={pic} />
          </div>
        </Col>
        <Col md={5}>
          <Row className="gap-3">
            <div className="d-flex align-items-baseline">
              <div>
                <h5 className="title-block">Product:</h5>
              </div>
              <div>
                <h3>{name}</h3>
              </div>
            </div>
            <div className="d-flex align-items-baseline">
              <div>
                <h5 className="title-block">Quantity:</h5>
              </div>
              <div>
                <h5 className="quantity-background">{quantity}</h5>
              </div>
            </div>
            <div className="d-flex align-items-baseline">
              <div>
                <h5 className="title-block">TotalPrice:</h5>
              </div>
              <div>
                <h5 className="total-background">{netPrice}฿</h5>
              </div>
            </div>
            <div className="d-flex align-items-baseline">
              <div>
                <h5 className="title-block">Delivery address:</h5>
              </div>
              <div>
                <h3 className="address-background">{address}</h3>
              </div>
            </div>
          </Row>
        </Col>
        <Col md={2}>
          <div className="d-flex gap-3 mb-2">
            <h3>Status:</h3>
            <h6 className={statusFuction(status)}> {status}</h6>
          </div>
          {status !== "SUCCESS" && status !== "FAIL" && (
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Control
                name="receiptURL"
                id="files"
                type="file"
                {...register("receiptURL")}
                onChange={(event) => {
                  setPictureFile(event.target.files[0]);
                }}
              />
              <p className="errorMessage">{errors["receiptURL"]?.message}</p>
              <Button className="green btn-small" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Order;
