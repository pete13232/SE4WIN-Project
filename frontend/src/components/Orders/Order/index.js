import { Row, Col, Form, Image } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import Button from "@restart/ui/esm/Button";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UPDATE_ORDER, CHANGE_STATUS } from "../../../Graphql/Mutations";
import Swal from "sweetalert2";

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

  const [img, setImg] = useState(null);

  /*------------------------Submit--------------------------*/
  const [updateOrder] = useMutation(UPDATE_ORDER);
  const [changeStatus] = useMutation(CHANGE_STATUS);
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
        const temp = { id: id };
        submit.receiptURL = res.data.imagePath;
        submit = Object.assign(temp, submit);
        console.log(submit);
        updateOrder({
          variables: { input: submit },
        }).then(() => {
          console.log("pass updateOrder");
          changeStatus({
            variables: { id: id, status: "PENDING" },
          })
            .then((res) => {
              Swal.fire({
                title: "Add new product success!",
                html: "Press Ok to continue",
                icon: "success",
                allowOutsideClick: false,
                allowEscapeKey: false,
              });
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
            <div className="d-flex">
              <div>
                <h5 className="title-block">Product:</h5>
              </div>
              <div>
                <h3>{name}</h3>
              </div>
            </div>
            <div className="d-flex">
              <div>
                <h5 className="title-block">Quantity:</h5>
              </div>
              <div>
                <h5 className="quantity-background">{quantity}</h5>
              </div>
            </div>
            <div className="d-flex">
              <div>
                <h5 className="title-block">TotalPrice:</h5>
              </div>
              <div>
                <h5 className="total-background">{netPrice}฿</h5>
              </div>
            </div>
            <div className="d-flex">
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
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Control
              name="receiptURL"
              id="files"
              type="file"
              // style={{ visibility: "hidden" }}
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
        </Col>
      </Row>
    </>
  );
};

export default Order;
