import { Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NavbarBootstrap from "../../components/NavbarBoostrap";
import Sidebar from "../../components/Sidebar";
import AdminStock from "../../components/AdminStock";
import AdminOrder from "../../components/AdminOrder";
import AdminCategory from "../../components/AdminCategory";
const AdminContainer = () => {
  const { id } = useParams();

  return (
    <div>
      <NavbarBootstrap />
      <Row className="m-0">
        <Sidebar id={id} />
        <AdminCategory id={id} />
        <AdminStock id={id} />
        <AdminOrder id={id} />
      </Row>
    </div>
  );
};
export default AdminContainer;
