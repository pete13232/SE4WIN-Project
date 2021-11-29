import Category from "../../components/Category/index";
import Footer from "../../components/Footer/index";
import NavbarBootstrap from "../../components/NavbarBoostrap/index";
import Products from "../../components/Products/index";
import { Container } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { Redirect } from "react-router-dom";
const HomeContainer = () => {
  const context = useContext(AuthContext);
  return (
    <div>
      {context.user?.role === "admin" ? (
        <Redirect to="/admin/stock" />
      ) : (
        <>
          <NavbarBootstrap />
          <Category />
          <Products />
        </>
      )}
    </div>
  );
};

export default HomeContainer;
