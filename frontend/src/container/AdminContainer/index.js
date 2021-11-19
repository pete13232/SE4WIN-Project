import { Row, Col } from "react-bootstrap";
import { Route, Link, Switch } from "react-router-dom";
import NavbarBootstrap from "../../components/NavbarBoostrap";
import Sidebar from "../../components/Sidebar";
import AdminStock from "../../components/AdminStock";
import AdminOrder from "../../components/AdminOrder";
import AdminCategory from "../../components/AdminCategory";

const AdminContainer = ({ match }) => {
  console.log(match.params.id);
  return (
    <div>
      <NavbarBootstrap />
      <Row className="m-0">
        <Sidebar id={match.params.id}/>
        <AdminStock id={match.params.id}/>
        <AdminOrder id={match.params.id}/>
        <AdminCategory id={match.params.id}/>
      </Row>
    </div>
  );
};
export default AdminContainer;
