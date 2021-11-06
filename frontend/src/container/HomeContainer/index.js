import Category from "../../components/Category/index";
import Footer from "../../components/Footer/index";
import NavbarBootstrap from "../../components/NavbarBoostrap/index";
import Products from "../../components/Products/index";
import { Container } from "react-bootstrap";

const HomeContainer = () => {
  return (
    <div>
      
        <NavbarBootstrap themeStatus={false} />
        <Category />
        <Products />
        <Footer />
        {/* <NavbarBootstrap themeStatus={true} />
        <h1>signup</h1>
        <NavbarBootstrap themeStatus={true} />
        <h1>login</h1>
        <h1>No page</h1> */}

    </div>
  );
};

export default HomeContainer;
