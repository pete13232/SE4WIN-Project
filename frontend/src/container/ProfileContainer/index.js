import NavbarBootstrap from "../../components/NavbarBoostrap";
import Header from "../../components/Header";
import Profile from "../../components/Profile";
import { Row,Col,Button } from "react-bootstrap";

const ProfileContainer = () => {
    return (
        <div>
            <NavbarBootstrap/>
            <Header text="Profile"/>
            <Profile/>
        </div>
    );
};
export default ProfileContainer;