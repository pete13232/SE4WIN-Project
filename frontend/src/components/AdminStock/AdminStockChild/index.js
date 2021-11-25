import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { AiFillPlusCircle, AiFillPicture } from "react-icons/ai";
import { ImBin } from "react-icons/im";
import AddStockModal from "../../Modal/AddStockModal";
import EditStockModal from "../../Modal/EditStockModal";
import Swal from "sweetalert2";
const AdminStockChild = ({id, name, category, price, desc, img, stock }) => {


  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const deleteAlert = () => {
    Swal.fire({
      position: "top",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
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
      <tr className="modify">
        <td>{id}</td>
        <td>{name}</td>
        <td>{category}</td>
        <td>{price} ฿</td>
        <td>
          {desc}
        </td>
        <td className="text-center">
          <AiFillPicture />
        </td>
        <td className="text-center">{stock}</td>
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
      <AddStockModal showAdd={showAdd} setShowAdd={setShowAdd} />
      <EditStockModal showEdit={showEdit} setShowEdit={setShowEdit} />
    </>
  );
};

export default AdminStockChild;
