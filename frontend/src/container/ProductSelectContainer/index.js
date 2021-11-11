import { Form, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarBootstrap from "../../components/NavbarBoostrap";
import Header from "../../components/Header";
import ProductDetail from "../../components/ProductDetail";
import ProductDescription from "../../components/ProductDescription";

const ProductSelectContainer = () => {
  return (
    <div>
      <NavbarBootstrap />
      <Header text="Keyboard > Keychron K3 Ultra-slim Wireless Mechanical Keyboard (Version 2)" />
      <ProductDetail />
      <Header text="Description"/>
      <ProductDescription/>
    </div>
  );
};

export default ProductSelectContainer;
