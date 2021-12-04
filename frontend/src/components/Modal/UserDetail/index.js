import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ADMIN_GET_USER_INFO } from "../../../Graphql/Queries";
import { Modal, Col, Row } from "react-bootstrap";
const UserDetail = ({ showUser, setShowUser, userId }) => {
  const handleClose = () => setShowUser(false);
  /*-------------------------Phone number modify----------------------------- */

  const phoneModify = (number) => {
    const showNumber =
      number.substring(0, 3) +
      "-" +
      number.substring(3, 6) +
      "-" +
      number.substring(6, 10);
    return showNumber;
  };
  /*-------------------------Phone number modify----------------------------- */

  /*-------------------------Query----------------------------- */
  const { data, error } = useQuery(ADMIN_GET_USER_INFO, {
    variables: { input: userId },
  });
  const [user, setUser] = useState();

  useEffect(() => {
    if (data) {
      setUser(data.user);
    }
  }, [data]);

  /*-------------------------Query----------------------------- */

  return (
    <>
      {user && (
        <Modal
          size="lg"
          show={showUser}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <h2>Order Detail</h2>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <div className="d-flex">
                  <div>
                    <h5 className="title-block">User_ID:</h5>
                  </div>
                  <div>
                    <h3>{user.id}</h3>
                  </div>
                </div>
                <div className="d-flex">
                  <div>
                    <h5 className="title-block">First Name:</h5>
                  </div>
                  <div>
                    <h3>{user.firstname}</h3>
                  </div>
                </div>

                <div className="d-flex">
                  <div>
                    <h5 className="title-block">Telephone:</h5>
                  </div>
                  <div>
                    <h3>{phoneModify(user.phoneNumber)}</h3>
                  </div>
                </div>

                <div className="d-flex">
                  <div>
                    <h5 className="title-block">Address:</h5>
                  </div>
                  <div>
                    <h3>{user.address}</h3>
                  </div>
                </div>
              </Col>

              <Col md={6}>
                <div className="d-flex">
                  <div>
                    <h5 className="title-block">Last Name:</h5>
                  </div>
                  <div>
                    <h3>{user.lastname}</h3>
                  </div>
                </div>

                <div className="d-flex">
                  <div>
                    <h5 className="title-block">Email:</h5>
                  </div>
                  <div>
                    <h3>{user.email}</h3>
                  </div>
                </div>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
export default UserDetail;
