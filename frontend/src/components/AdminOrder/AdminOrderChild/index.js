import {
  Button,
  Dropdown,
  Tooltip,
  Image,
  OverlayTrigger,
} from "react-bootstrap";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { AiFillPicture, AiOutlineCheckSquare } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { CHANGE_STATUS } from "../../../Graphql/Mutations";
import Swal from "sweetalert2";
import UserDetail from "../../Modal/UserDetail";
import "./style.css";

const AdminOrderChild = ({
  orderId,
  productId,
  userId,
  address,
  product,
  quantity,
  price,
  receipt,
  status,
  refetch,
}) => {
  /*-----------------------------UI state-------------------------*/

  const [confirm, setConfirm] = useState(true);
  const [choose, setChoose] = useState(true);
  const [currentStatus, setCurretnStatus] = useState(status);
  const [showUser, setShowUser] = useState(false);

  const handleEdit = () => {
    // change to edit state
    setConfirm(false);
    setChoose(false);
  };

  const handleConfirm = () => {
    //change to confirm state
    onSubmit(currentStatus); //submit curret selected status
    setConfirm(true);
    setChoose(true);
  };

  const changeStatus = (event) => {
    // when select new status , change to current status
    setCurretnStatus(event.target.innerText);
  };

  const buttonStatus = () => {
    // button UI state
    if (status === "AWAITING") {
      return (
        <Button className="yellow btn-small text-black" disabled>
          {status}
        </Button>
      );
    } else if (status === "PENDING") {
      return (
        <Button className="blue btn-small text-black" disabled>
          {status}
        </Button>
      );
    } else if (status === "SUCCESS") {
      return (
        <Button className="green btn-small text-black" disabled>
          {status}
        </Button>
      );
    } else if (status === "FAIL") {
      return (
        <Button className="red btn-small text-black" disabled>
          {status}
        </Button>
      );
    }
  };

  const switchShow = () => {
    //edit button and dropdown showing
    if (choose === true) {
      return buttonStatus();
    } else {
      return (
        <Dropdown drop="end">
          <Dropdown.Toggle id="dropdown-basic" className="btn-small grey">
            {currentStatus}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={changeStatus}>AWAITING</Dropdown.Item>
            <Dropdown.Item onClick={changeStatus}>PENDING</Dropdown.Item>
            <Dropdown.Item onClick={changeStatus}>SUCCESS</Dropdown.Item>
            <Dropdown.Item onClick={changeStatus}>FAIL</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }
  };
  /*-----------------------------UI state-------------------------*/
  /*------------------------Submit--------------------------*/
  const [changeStatusGQL] = useMutation(CHANGE_STATUS);

  const onSubmit = (submit) => {
    if (submit !== status) {
      changeStatusGQL({
        variables: { id: orderId, status: submit },
      })
        .then((res) => {
          // change status success
          var resText = res.data.changeStatus;
          Swal.fire({
            title: "Change status success!",
            text: resText,
            icon: "success",
          });
          refetch();
        })
        .catch((error) => {
          // change status fail
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
  };

  const tooltipImg = (props) => (
    <Tooltip className="tooltip-img" {...props}>
      <Image src={receipt} alt="Reciept Image" />
    </Tooltip>
  );
  // console.log(address.length)

  const textCut = () => {
    var text = address;
    // console.log(text.length);
    if (text !== null) {
      if (text.length > 40) {
        text = text.substring(0, 25).concat("...");
      }
    }
    return text;
  };

  const tooltipDesc = (props) => <Tooltip {...props}>{address}</Tooltip>;
  /*------------------------Submit--------------------------*/
  return (
    <>
      <tbody>
        <tr className="modify">
          <td>{orderId}</td>
          <td>{productId}</td>
          <td
            onClick={() => {
              setShowUser(true);
            }}
            className="order-detail"
          >
            {userId}
          </td>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={tooltipDesc}
          >
            <td>{textCut()}</td>
          </OverlayTrigger>
          <td>{product}</td>
          <td>{quantity}</td>
          <td>{price} ฿</td>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={tooltipImg}
          >
            <td className="text-center">
              <AiFillPicture />
            </td>
          </OverlayTrigger>
          <td className="d-flex gap-2">
            {switchShow()}

            {confirm ? (
              <div className="edit">
                <FaRegEdit onClick={handleEdit} />
              </div>
            ) : (
              <div className="check">
                <AiOutlineCheckSquare onClick={handleConfirm} />
              </div>
            )}
          </td>
        </tr>
      </tbody>
      <UserDetail
        showUser={showUser}
        setShowUser={setShowUser}
        userId={userId}
      />
    </>
  );
};

export default AdminOrderChild;
