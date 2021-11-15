import Category from "../../components/Category/index";
import Footer from "../../components/Footer/index";
import NavbarBootstrap from "../../components/NavbarBoostrap/index";
import Products from "../../components/Products/index";
import { Container } from "react-bootstrap";

const HomeContainer = () => {
  return (
    <div>
      
        <NavbarBootstrap/>
        <Category />
        <Products />

    </div>
  );
};

export default HomeContainer;
