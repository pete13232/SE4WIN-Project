import { useEffect, useState } from "react";
import "./style.css";
import { CloseButton } from "react-bootstrap";
const Header = ({
  text,
  dropdown,
  queryState,
  setQueryState,
  setSearchName,
  setFilterCategoryId,
  resetState
}) => {
  console.log("header component");
  return (
    <>
      <div className=" header px-2 space-md">
        <h3>{text}</h3>
        {(queryState === 2 || queryState === 3) && (
          <CloseButton onClick={()=>{resetState()}} />
        )}
        {dropdown}
      </div>
    </>
  );
};

export default Header;
