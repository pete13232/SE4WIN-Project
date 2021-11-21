import { Col, Row } from "react-bootstrap";
import "./style.css";

const Header = ({ text }) => {
  return (
    <div className="space-md header">
      <div className="header px-2">
        <h3>{text}</h3>
      </div>
    </div>
  );
};

export default Header;
