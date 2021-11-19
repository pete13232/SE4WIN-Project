import { Row, Col, Table, Button } from "react-bootstrap";
import { FaRegEdit, FaEdit } from "react-icons/fa";
import { AiFillPlusCircle, AiFillPicture } from "react-icons/ai";
import { ImBin } from "react-icons/im";
import React, { useState } from "react";
import AddProductModal from "../Modal/AddProductModal";
import AddStockModal from "../Modal/AddStockModal";
import "./style.css";

const AdminStock = ({ id }) => {
  const [showProduct, setShowProduct] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  // const handle = () => setShows(true);

  return (
    <>
      {id === "stock" && (
        <Col md={10} className="bg-white">
          <Button
            onClick={() => {
              setShowProduct(true);
            }}
            className="mx-4 my-3 blue btn-medium"
          >
            +Product
          </Button>
          <AddProductModal
            showProduct={showProduct}
            setShowProduct={setShowProduct}
          />
          <Table striped bordered hover className="px-1">
            <thead className="table-head">
              <tr className="text-center">
                <th>P_ID</th>
                <th>P_Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Describtion</th>
                <th>Picture</th>
                <th>Quantity</th>
                <th>modify</th>
              </tr>
            </thead>
            <tbody>
              <tr className="modify">
                <td>P_001</td>
                <td>Keychron K4V2</td>
                <td>Keyboard</td>
                <td>4389 B.</td>
                <td>
                  Keychron K3 Ultra-slim Wireless Bluetooth Mechanical Keyboard
                  version 2 has included keycaps for both Windows and macOS, and
                  users can hot-swap every switch in seconds with the
                  hot-swappable version. Please drop your email on "Notify Me
                  When Available" if the product model is out of stock.
                </td>
                <td className="text-center">
                  <AiFillPicture />
                </td>
                <td className="text-center">5</td>
                <td>
                  <div className="d-flex gap-1">
                    <div className="add">
                      <AiFillPlusCircle
                        onClick={() => {
                          setShowAdd(true);
                        }}
                      />
                      <AddStockModal
                        showAdd={showAdd}
                        setShowAdd={setShowAdd}
                      />
                    </div>
                    <div className="edit">
                      <FaRegEdit
                        onClick={() => {
                          setShowEdit(true);
                        }}
                      >
                        {/* <AddProductModal showEdit={showEdit} setShowEdit={setShowEdit} /> */}
                      </FaRegEdit>
                    </div>
                    <div className="bin">
                      <ImBin
                        onClick={() => {
                          setShowDelete(true);
                        }}
                      >
                        {/* <AddProductModal showDelete={showDelete} setShowDelete={setShowDelete} /> */}
                      </ImBin>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>P_001</td>
                <td>Keychron K4V2</td>
                <td>Keyboard</td>
                <td>4389 B.</td>
                <td>
                  Keychron K3 Ultra-slim Wireless Bluetooth Mechanical Keyboard
                  version 2 has included keycaps for both Windows and macOS, and
                  users can hot-swap every switch in seconds with the
                  hot-swappable version. Please drop your email on "Notify Me
                  When Available" if the product model is out of stock.
                </td>
                <td>@mdo</td>
                <td>5</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      )}
    </>
  );
};
export default AdminStock;
