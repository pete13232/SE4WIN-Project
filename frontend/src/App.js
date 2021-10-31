import { Link, Route } from "react-router-dom";
import NavbarBootstrap from "./components/NavbarBootstrap";
function App() {
  return (
    <div>
      <Route path="/">
        <NavbarBootstrap />
      </Route>
    </div>
  );
}

export default App;
