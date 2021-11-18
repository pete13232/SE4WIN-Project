import { Row, Col } from "react-bootstrap";
import { Route, Link, Switch } from "react-router-dom";
import NavbarBootstrap from "../../components/NavbarBoostrap";
import Sidebar from "../../components/Sidebar";
import StockAdmin from "../../components/StockAdmin";

const AdminContainer = () => {
  return (
    <div>
      <NavbarBootstrap />
      <Row className="m-0">
        <Sidebar />
        {/* <Switch>
          <Route path="/admin/stock">
            <StockAdmin />
          </Route>
        </Switch> */}
        <StockAdmin/>
      </Row>
    </div>
  );
};
export default AdminContainer;
