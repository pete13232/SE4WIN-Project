import { useContext } from "react";
import { AuthProvider } from "./context/auth.js";
import { AuthContext } from "./context/auth.js";
import { onError } from "@apollo/client/link/error";
import { Container } from "react-bootstrap";
import { Route, Switch, Redirect } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  ApolloLink,
} from "@apollo/client";
import AdminRoute from "./util/AdminRoute.js";
import GuestRoute from "./util/GuestRoute.js";
import UserRoute from "./util/UserRoute.js";
import HomeContainer from "./container/HomeContainer/index.js";
import SignupContainer from "./container/SignupContainer/index.js";
import LoginContainer from "./container/LoginContainer/index.js";
import Footer from "./components/Footer/index.js";
import ProductSelectContainer from "./container/ProductSelectContainer/index.js";
import ProfileContainer from "./container/ProfileContainer/index.js";
import OrderContainer from "./container/OrderContainer/index.js";
import AdminContainer from "./container/AdminContainer/index.js";
function App() {
  /* ----------------- Graphql Setup ----------------------- */

  const link = from([new HttpLink({ uri: "http://20.212.81.174/graphql" })]);

  const token = localStorage.getItem("jwtToken") || "";
  const authMiddleware = new ApolloLink((operation, forward) => {
    if (token !== "") {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      <Redirect to="/login" />;
    }
    return forward(operation);
  });

  const context = useContext(AuthContext);
  const logoutLink = onError(({ networkError }) => {
    if (networkError?.statusCode === 401) context.logout();
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: logoutLink.concat(authMiddleware.concat(link)),
  });

  /* ----------------- Graphql Setup ----------------------- */
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
          <Container className=" bg-container px-0">
            <Switch>
              <Route exact path="/">
                <HomeContainer />
              </Route>
              <GuestRoute path="/signup" component={SignupContainer} />
              <GuestRoute path="/login" component={LoginContainer} />
              <UserRoute path="/order" component={OrderContainer} />
              <UserRoute path="/profile" component={ProfileContainer} />
              <AdminRoute path="/admin/:id" component={AdminContainer} />
              <Route path="/products/:id">
                <ProductSelectContainer />
              </Route>
              <Route exact path="/products">
                <Redirect to="/" />
              </Route>
              <Route exact path="/admin">
                <Redirect to="/admin/stock" />
              </Route>
              <Route path="/:id">
                <p>Page not found</p>
              </Route>
            </Switch>
            <Footer />
          </Container>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
