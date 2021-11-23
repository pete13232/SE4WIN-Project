import { Modal, Button, Image, Row, Col, Form } from "react-bootstrap";
import ButtonCustom from "../../ButtonCustom";
import { useContext, useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_ADDRESS } from "../../../Graphql/Queries";
import { AuthContext } from "../../../context/auth";

import "./style.css";
import { CREATE_ORDER } from "../../../Graphql/Mutations";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";

const ProductModal = ({
  picURL,
  name,
  selectQuantity,
  totalPrice,
  productId,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const context = useContext(AuthContext);
  const { data, error } = useQuery(GET_USER_ADDRESS, {
    variables: { input: context.user.sub },
  });
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (data) {
      setAddress(data.user.address);
    }
  }, [data]);

  const schema = yup.object().shape({
    address: yup.string().required("Please enter your address"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [createOrder] = useMutation(CREATE_ORDER);
  const onSubmit = (data) => {
    const param = {
      userId: Number(context.user.sub),
      productId: Number(productId),
      quantity: Number(-selectQuantity),
      order_address: data.address,
    };
    console.log(param);
    createOrder({
      variables: {input: param},
    })
      .then(() => {
        Swal.fire({
          title: "Create order success!",
          html: "Press Ok to order page",
          icon: "success",
          allowOutsideClick: false,
          allowEscapeKey: false,
          didClose: () => {
            window.location.replace("/order");
          },
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
    console.log(param);
  };

  return (
    <div>
      <Button className="ms-4 blue btn btn-large" onClick={handleShow}>
        Buy
      </Button>

      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <h2>Confirmation</h2>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Row className="gap-3">
              <div className="confirm-image d-flex justify-content-center">
                <Image src={picURL} />
              </div>
              <div className="d-flex align-items-center">
                <div className="title-block d-flex align-items-center justify-content-end">
                  <h5>Product:</h5>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <h3>{name}</h3>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <div className="title-block d-flex align-items-center justify-content-end">
                  <h5>Quantity:</h5>
                </div>
                <div className="ms-4 d-flex align-items-center justify-content-center quantity-background">
                  <h3>{selectQuantity}</h3>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <div className="title-block d-flex align-items-center justify-content-end">
                  <h5>TotalPrice:</h5>
                </div>
                <div className="ms-4 d-flex align-items-center justify-content-center total-background">
                  <h3>{totalPrice} ฿</h3>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <div className="title-block d-flex align-items-center justify-content-end">
                  <h5>Delivery address:</h5>
                </div>
                <div className="d-flex align-items-center justify-content-center address-background">
                  <Form.Control
                    name="address"
                    defaultValue={address}
                    type="text"
                    placeholder="Enter address"
                    {...register("address")}
                  />
                </div>
              </div>
              <p className="errorMessage">{errors["address"]?.message}</p>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button className="grey btn-small" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              className="green btn-small"
              type="submit"
              onClick={() => {
                if (!errors["address"]?.message) {
                  handleClose();
                }
              }}
            >
              Confirm
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};
export default ProductModal;
