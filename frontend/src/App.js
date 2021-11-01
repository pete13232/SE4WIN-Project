import NavbarBootstrap from "./components/NavbarBootstrap";
import Category from "./components/Category";
import Product from "./components/Product";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div>
      <Container className="px-0" style={{ background: "#EAEAEA" }}>
        <NavbarBootstrap />
        <Category />
        <Product />
        <Footer/>
      </Container>
    </div>
  );
}

export default App;
