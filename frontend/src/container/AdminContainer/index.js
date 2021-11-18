import { Row, Col } from "react-bootstrap";
import { Route, Link, Switch } from "react-router-dom";
import NavbarBootstrap from "../../components/NavbarBoostrap";
import Sidebar from "../../components/Sidebar";
import StockAdmin from "../../components/StockAdmin";

const AdminContainer = ({ match }) => {
  // console.log(match.params.id);
  return (
    <div>
      <NavbarBootstrap />
      <Row className="m-0">
        <Sidebar id={match.params.id}/>
        <StockAdmin id={match.params.id}/>
      </Row>
    </div>
  );
};
export default AdminContainer;
