import { useState } from "react";
import { useMutation } from "@apollo/client";
import { FaRegEdit } from "react-icons/fa";
import { AiFillPlusCircle, AiFillPicture } from "react-icons/ai";
import { ImBin } from "react-icons/im";
import { REMOVE_PRODUCT } from "../../../Graphql/Mutations";
import { OverlayTrigger, Tooltip, Image } from "react-bootstrap";
import Swal from "sweetalert2";
import AddStockModal from "../../Modal/AddStockModal";
import EditStockModal from "../../Modal/EditStockModal";
import "./style.css"

const AdminStockChild = ({
  id,
  name,
  category,
  price,
  desc,
  img,
  stock,
  refetch,
}) => {
  const [removeProduct] = useMutation(REMOVE_PRODUCT);
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
        removeProduct({
          variables: { input: id },
        })
          .then(() => {
            Swal.fire({
              position: "top",
              title: "Deleted!",
              text: "This product has been deleted.",
              icon: "success",
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
      }
    });
  };

  // Description truncate
  const tooltipDesc = (props) => <Tooltip {...props}>{desc}</Tooltip>;
  const tooltipImg= (props) => <Tooltip className="tooltip-img" {...props}><Image src={img} alt="Product Image"/></Tooltip>;
  const textCut = () => {
    var text = desc;
    if (text.length > 40) {
      text = text.substring(0, 25).concat("...");
    }
    return text;
  };

  return (
    <>
      <tr className="modify">
        <td>{id}</td>
        <td>{name}</td>
        <td>{category}</td>
        <td>{price} ฿</td>
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={tooltipDesc}
        >
          <td>{textCut()}</td>
        </OverlayTrigger>
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={tooltipImg}
        >
          <td className="text-center">
            <AiFillPicture />
          </td>
        </OverlayTrigger>
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
      <AddStockModal
        showAdd={showAdd}
        setShowAdd={setShowAdd}
        ProductId={id}
        ProductName={name}
        ProductQuantity={stock}
        refetch={refetch}
      />
      <EditStockModal
        showEdit={showEdit}
        setShowEdit={setShowEdit}
        refetch={refetch}
        id={id}
        name={name}
        category={category}
        price={price}
        desc={desc}
        img={img}
        stock={stock}
      />
    </>
  );
};

export default AdminStockChild;
