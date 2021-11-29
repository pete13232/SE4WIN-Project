import { useState } from "react";
import { ImBin } from "react-icons/im";
import Swal from "sweetalert2";
import { FaRegEdit, FaEdit } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import EditCategoryModal from "../../Modal/EditCategoryModal";
import { REMOVE_CATEGORY } from "../../../Graphql/Mutations";
const AdminCategoryChild = ({ id, categoryName, picURL, refetch }) => {


  const [showEditCategory, setShowEditCategory] = useState(false);

  const [removeCategory] = useMutation(REMOVE_CATEGORY);
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
            removeCategory({
              variables: { input: id },
            })
              .then(() => {
                Swal.fire({
                  position: "top",
                  title: "Deleted!",
                  text: "This category has been deleted.",
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

  return (
    <>
      <tr className="modify" key={id}>
        <td>{id}</td>
        <td className="text-center">{categoryName}</td>
        <td>
          <div className="d-flex gap-1">
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
