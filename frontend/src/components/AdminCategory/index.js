import { Col } from "react-bootstrap";

const AdminCategory = ({ id }) => {
  return (
    <>
      {id === "category" && (
        <Col md={10}>
          <h4>Category</h4>
        </Col>
      )}
    </>
  );
};
export default AdminCategory;
