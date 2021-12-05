import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { Redirect } from "react-router-dom";
import Category from "../../components/Category/index";
import NavbarBootstrap from "../../components/NavbarBoostrap/index";
import Products from "../../components/Products/index";

const HomeContainer = () => {
  const context = useContext(AuthContext);
  return (
    <>
      {context.user?.role === "admin" ? (
        <Redirect to="/admin/stock" />
      ) : (
        <>
          <NavbarBootstrap />
          <Category />
          {/* <Products /> */}
        </>
      )}
    </>
  );
};

export default HomeContainer;
