import { Col } from "react-bootstrap";

const AdminOrder = ({ id }) => {
  return (
    <>
      {id === "order" && (
        <Col md={10}>
          <h4>Order</h4>
        </Col>
      )}
    </>
  );
};
export default AdminOrder;
