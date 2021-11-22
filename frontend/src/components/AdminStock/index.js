import { Row, Col, Table, Button } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { AiFillPlusCircle, AiFillPicture } from "react-icons/ai";
import { ImBin } from "react-icons/im";
import React, { useState } from "react";
import AddProductModal from "../Modal/AddProductModal";
import AddStockModal from "../Modal/AddStockModal";
import EditStockModal from "../Modal/EditStockModal";
import Swal from "sweetalert2";
import "./style.css";

const AdminStock = ({ id }) => {
  const [showProduct, setShowProduct] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const deleteAlert = () => {
    Swal.fire({
      position: "top",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "top",
          title: "Deleted!",
          text: "This product has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      {id === "stock" && (
        <Col md={10} className="bg-white admin-stock">
          <Button
            onClick={() => {
              setShowProduct(true);
            }}
            className="mx-4 my-3 blue btn-medium"
          >
            +Product
          </Button>
          <Table striped bordered hover className="px-1">
            <thead className="table-head">
              <tr className="text-center">
                <th>P_ID</th>
                <th>P_Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Description</th>
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
                    </div>
                    <div className="edit">
                      <FaRegEdit
                        onClick={() => {
                          setShowEdit(true);
                        }}
                      />
                    </div>
                    <div className="bin">
                      <ImBin onClick={deleteAlert} />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      )}

      {/* Modal */}
      <AddProductModal
        showProduct={showProduct}
        setShowProduct={setShowProduct}
      />
      <AddStockModal showAdd={showAdd} setShowAdd={setShowAdd} />
      <EditStockModal showEdit={showEdit} setShowEdit={setShowEdit} />
    </>
  );
};
export default AdminStock;
