import { useState } from "react";
import { ImBin } from "react-icons/im";
import { FaRegEdit } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { REMOVE_CATEGORY } from "../../../Graphql/Mutations";
import { AiFillPicture } from "react-icons/ai";
import { OverlayTrigger,Tooltip, Image } from "react-bootstrap";
import Swal from "sweetalert2";
import EditCategoryModal from "../../Modal/EditCategoryModal";

const AdminCategoryChild = ({ id, categoryName, picURL, refetch }) => {
  const [showEditCategory, setShowEditCategory] = useState(false); // Modal show status

  /*------------------------Delete Category-------------------------*/

  const [removeCategory] = useMutation(REMOVE_CATEGORY);
  const deleteAlert = () => {
    Swal.fire({
      // Delete Category confirmation
      position: "top",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      // confirm delete
      if (result.isConfirmed) {
        removeCategory({
          // delete category
          variables: { input: id }, //delete by category id
        })
          .then(() => {
            // delete success
            Swal.fire({
              position: "top",
              title: "Deleted!",
              text: "This category has been deleted.",
              icon: "success",
            });
            refetch(); // refetch changed data
          })
          .catch((error) => {
            //delete fail
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

  const tooltipImg= (props) => <Tooltip className="tooltip-img" {...props}><Image src={picURL} alt="Category Image"/></Tooltip>;
  console.log(picURL)
  /*------------------------Delete Category-------------------------*/
  return (
    <>
      <tr className="modify" key={id}>
        <td className="text-center">{id}</td>
        <td className="text-center">{categoryName}</td>
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={tooltipImg}
        >
          <td className="text-center">
            <AiFillPicture />
          </td>
        </OverlayTrigger>
        <td>
          <div className="d-flex justify-content-center gap-4">
            <div className="edit">
              <FaRegEdit
                onClick={() => {
                  setShowEditCategory(true);
                }}
              />
            </div>
            <div className="bin">
              <ImBin onClick={deleteAlert} />
            </div>
          </div>
        </td>
      </tr>
      <EditCategoryModal
        showEditCategory={showEditCategory}
        setShowEditCategory={setShowEditCategory}
        categoryId={id}
        categoryName={categoryName}
        refetch={refetch}
      />
    </>
  );
};

export default AdminCategoryChild;
