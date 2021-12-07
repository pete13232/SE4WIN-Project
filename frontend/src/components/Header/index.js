import "./style.css";
import { CloseButton, Button } from "react-bootstrap";
const Header = ({
  text,
  dropdown,
  queryState,
  categoryColor,
  searchColor,
  setQueryState,
  setSearchName,
  setFilterCategoryId,
  resetState,
}) => {
  console.log(text);
  return (
    <>
      <div className=" header px-2 space-md">
        <div className="d-flex align-items-center">
          <h3>
            {text}
            {(queryState === 2 || queryState === 3) && (
              <span className="text-color">
                {queryState === 2 ? `"${categoryColor}"` : `"${searchColor}"`}
              </span>
            )}
          </h3>
          {(queryState === 2 || queryState === 3) && (
            <>
              <Button
                onClick={() => {
                  resetState();
                }}
                className="mx-4 p-0 red btn-small btn-clear"
              >
                clear
              </Button>
            </>
          )}
        </div>
        <div>{dropdown}</div>
      </div>
    </>
  );
};

export default Header;
