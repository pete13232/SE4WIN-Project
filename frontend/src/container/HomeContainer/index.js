import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth";
import { Redirect } from "react-router-dom";
import Category from "../../components/Category/index";
import NavbarBootstrap from "../../components/NavbarBoostrap/index";
import Products from "../../components/Products/index";

const HomeContainer = () => {
  const context = useContext(AuthContext); // Authentication context
  const [queryState, setQueryState] = useState(1); // query state
  const [searchName, setSearchName] = useState(""); // search naem state
  const [filterCategoryId, setFilterCategoryId] = useState(); // filtered category id state

  const resetState = () => {
    // reset all state to default function
    setQueryState(1);
    setSearchName("");
    setFilterCategoryId();
  };
  return (
    <>
      {context.user?.role === "admin" ? (// if admin redirect to home, redirect to admin stock page
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
            setQueryState={setQueryState}
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
