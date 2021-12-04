import "./style.css";

const Header = ({ text, dropdown }) => {
  return (
    <>
      <div className=" header px-2 space-md">
        <h3>{text}</h3>
        {dropdown}
      </div>
    </>
  );
};

export default Header;
