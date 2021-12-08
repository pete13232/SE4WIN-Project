import { Modal, Button, Image, Row, Form } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { GET_USER_ADDRESS } from "../../../Graphql/Queries";
import { AuthContext } from "../../../context/auth";
import { CREATE_ORDER } from "../../../Graphql/Mutations";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import "./style.css";

const ProductModal = ({
  picURL,
  name,
  selectQuantity,
  totalPrice,
  productId,
  showProduct,
  setShowProduct,
}) => {
  const context = useContext(AuthContext); // Authentication context

  const handleClose = () => setShowProduct(false); // Modal state

  /*----------------------------Query----------------------------------*/
  const { data } = useQuery(GET_USER_ADDRESS); //query user address
  const [address, setAddress] = useState(""); //address state

  useEffect(() => {
    // initial data when data change
    if (data) {
      setAddress(data.me.address);
    }
  }, [data]);
  /*----------------------------Query----------------------------------*/
  /*----------------------------Submit---------------------------------*/
  const schema = yup.object().shape({
    // form schema
    address: yup.string().required("Please enter your address"),
  });
  const {
    // form variables
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [createOrder] = useMutation(CREATE_ORDER); //create order mutation
  const onSubmit = (data) => {
    // submit function
    const param = {
      // parameter to submit
      userId: Number(context.user.sub),
      productId: Number(productId),
      quantity: Number(-selectQuantity),
      orderAddress: data.address,
    };
    createOrder({
      //create order to graphQL
      variables: { input: param },
    })
      .then(() => {
        //if create order success
        Swal.fire({
          title: "Create order success!",
          html: "Press Ok to order page",
          icon: "success",
          allowOutsideClick: false,
          allowEscapeKey: false,
          didClose: () => {
            // close sweet alert
            window.location.replace("/order"); // go to order page
          },
        });
        handleClose();
      })
      .catch((error) => {
        // if create order fail
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
  /*----------------------------Submit---------------------------------*/
  return (
    <>
      <div>
        <Modal
          size="lg"
          show={showProduct}
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
                <div>
                  <div className="confirm-image d-flex justify-content-center">
                    <Image src={picURL} />
                  </div>
                </div>
                <Row className="gap-3 ms-5 confirm-detail">
                  <div className="d-flex align-items-baseline">
                    <div className="title-block d-flex align-items-center justify-content-end">
                      <h5>Product:</h5>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                      <h3>{name}</h3>
                    </div>
                  </div>
                  <div className="d-flex align-items-baseline">
                    <div className="title-block d-flex align-items-center justify-content-end">
                      <h5>Quantity:</h5>
                    </div>
                    <div className="d-flex align-items-center justify-content-center quantity-background">
                      <h3>{selectQuantity}</h3>
                    </div>
                  </div>
                  <div className="d-flex align-items-baseline">
                    <div className="title-block d-flex align-items-center justify-content-end">
                      <h5>TotalPrice:</h5>
                    </div>
                    <div className="d-flex align-items-center justify-content-center total-background">
                      <h3>{totalPrice} ฿</h3>
                    </div>
                  </div>
                  <div className="d-flex align-items-baseline">
                    <div className="title-block d-flex align-items-center justify-content-end">
                      <h5>Delivery address:</h5>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                      <Form.Control
                        name="address"
                        defaultValue={address}
                        type="text"
                        placeholder="Enter address"
                        {...register("address")}
                      />
                    </div>
                  </div>
                  {errors["address"]?.message && (
                    <p className="errorMessage text-end pe-5">
                      {errors["address"]?.message}
                    </p>
                  )}
                </Row>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button className="grey btn-small" onClick={handleClose}>
                Cancel
              </Button>
              <Button className="green btn-small" type="submit">
                Confirm
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </>
  );
};
export default ProductModal;
