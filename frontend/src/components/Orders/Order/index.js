import { Row, Col, Button, Image } from "react-bootstrap";
const Order = ({pic, name, quantity, netPrice, address, status}) => {

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
    return (
      <>
        <Row className="d-flex mt-3 bg-white order-container gx-0" >
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
            <label htmlFor="files" className="btn btn-medium blue">
              Upload receipt
            </label>
            <input id="files" type="file" style={{ visibility: "hidden" }} />
          </Col>
        </Row>
        </>
    )
}

export default Order
