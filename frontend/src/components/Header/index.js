import { useContext } from "react";
import "./style.css";
import { CloseButton } from "react-bootstrap";
import { QueryContext } from "../../context/query";
const Header = ({ text, dropdown, closeButton}) => {
  const { setQueryState, setSearchName, setFilterCategoryId } = useContext(QueryContext)
  const resetState =  () => {
    setQueryState(1)
    setSearchName("")
    setFilterCategoryId()
  }
  return (
    <>
      <div className=" header px-2 space-md">
        <h3>{text}</h3>
        {(closeButton === 2 || closeButton === 3) && <CloseButton onClick={resetState()} />}
        {dropdown}
      </div>
    </>
  );
};

export default Header;
