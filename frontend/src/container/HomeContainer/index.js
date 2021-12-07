import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth";
import { Redirect } from "react-router-dom";
import Category from "../../components/Category/index";
import NavbarBootstrap from "../../components/NavbarBoostrap/index";
import Products from "../../components/Products/index";

const HomeContainer = () => {
  const context = useContext(AuthContext);
  const [queryState, setQueryState] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [filterCategoryId, setFilterCategoryId] = useState();

  const resetState = () => {
    setQueryState(1);
    setSearchName("");
    setFilterCategoryId();
  }
  return (
    <>
      {context.user?.role === "admin" ? (
        <Redirect to="/admin/stock" />
      ) : (
        <>
          <NavbarBootstrap
            queryState={queryState}
            setQueryState={setQueryState}
            searchName={searchName}
            setSearchName={setSearchName}
            resetState={resetState}
          />
          <Category
            queryState={queryState}
            setQueryState={setQueryState}
            filterCategoryId={filterCategoryId}
            setFilterCategoryId={setFilterCategoryId}
          />
          <Products
            queryState={queryState}
            setQueryState={setQueryState}
            searchName={searchName}
            setSearchName={setSearchName}
            filterCategoryId={filterCategoryId}
            setFilterCategoryId={setFilterCategoryId}
            resetState={resetState}
          />
        </>
      )}
    </>
  );
};

export default HomeContainer;
