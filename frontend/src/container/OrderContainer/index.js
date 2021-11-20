import { Row,Col,Button } from "react-bootstrap";
import Header from "../../components/Header";
import NavbarBootstrap from "../../components/NavbarBoostrap";
import Orders from "../../components/Orders";

const OrderContainer = () => {
    return (
        <div>
            <NavbarBootstrap/>
            <Header text="Order"/>
            <Orders  />
        </div>
    );
};
export default OrderContainer;