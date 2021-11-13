import { Row,Col,Button } from "react-bootstrap";
import Header from "../../components/Header";
import NavbarBootstrap from "../../components/NavbarBoostrap";
import Order from "../../components/Order";

const OrderContainer = () => {
    return (
        <div>
            <NavbarBootstrap/>
            <Header text="Order"/>
            <Order/>
        </div>
    );
};
export default OrderContainer;