import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { FaBoxes } from "react-icons/fa";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./style.css";

const Sidebar = ({ id }) => {
  const [stockSelect, setStockSelect] = useState(true);
  const [orderSelect, setOrderSelect] = useState(false);
  const [categorySelect, setCategorySelect] = useState(false);

  // Menu select highlight
  useEffect(() => {
    if (id === "stock") {
      setStockSelect(true);
      setOrderSelect(false);
      setCategorySelect(false);
    } else if (id === "order") {
      setStockSelect(false);
      setOrderSelect(true);
      setCategorySelect(false);
    } else if (id === "category") {
      setStockSelect(false);
      setOrderSelect(false);
      setCategorySelect(true);
    }
  }, [id]);
  // const handleStockSelect = () => {
  //   setStockSelect(true);
  //   setOrderSelect(false);
  //   setCategorySelect(false);
  // };
  // const handleOrderSelect = () => {
  //   setStockSelect(false);
  //   setOrderSelect(true);
  //   setCategorySelect(false);
  // };
  // const handleCategorySelect = () => {
  //   setStockSelect(false);
  //   setOrderSelect(false);
  //   setCategorySelect(true);
  // };
  return (
    <>
      <Col
        md={2}
        className="d-flex sidebar text-center  justify-content-center"
      >
        <div className="menu">
          <Link to="/admin/stock">
            <div className={`${stockSelect ? "sidebar-select" : ""}`}>
              <h5 className="d-flex gap-2">
                <FaBoxes />
                Stock
              </h5>
            </div>
          </Link>
          <Link to="/admin/order">
            <div className={`${orderSelect ? "sidebar-select" : ""}`}>
              <h5 className="d-flex gap-2 ">
                <AiOutlineUnorderedList />
                Order
              </h5>
            </div>
          </Link>
          <Link to="/admin/category">
            <div className={`${categorySelect ? "sidebar-select" : ""}`}>
              <h5 className="d-flex gap-2">
                <BiCategory />
                Category
              </h5>
            </div>
          </Link>
        </div>
      </Col>
    </>
  );
};
export default Sidebar;
