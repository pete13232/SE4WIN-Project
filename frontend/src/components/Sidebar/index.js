import { Button, Col, Row, Table } from "react-bootstrap";
import React, { useState } from "react";
import { FaBoxes } from "react-icons/fa";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { Link } from "react-router-dom";


import "./style.css";

const Sidebar = ({id}) => {
  return (
    <>
      <Col
        md={2}
        className="d-flex sidebar text-center  justify-content-center"
      >
        <div className="menu">
          <Link to="/admin/stock">
            <h5 className="d-flex gap-2">
              <FaBoxes />
              Stock
            </h5>
          </Link>
          <Link to="#">
            <h5 className="d-flex gap-2 ">
              <AiOutlineUnorderedList />
              Order
            </h5>
          </Link>
          <Link to="#">
            <h5 className="d-flex gap-2">
              <BiCategory />
              Category
            </h5>
          </Link>
        </div>
      </Col>
    </>
  );
};
export default Sidebar;
