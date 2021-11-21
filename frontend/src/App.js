import { useState } from "react";
import { Container } from "react-bootstrap";
import { Route, Link, Switch } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { AuthProvider } from "./context/auth.js";
import GuestRoute from "./util/GuestRoute.js";
import UserRoute from "./util/UserRoute.js";
import { onError } from "@apollo/client/link/error";
import HomeContainer from "./container/HomeContainer/index.js";
import SignupContainer from "./container/SignupContainer/index.js";
import LoginContainer from "./container/LoginContainer/index.js";
import Footer from "./components/Footer/index.js";
import ProductSelectContainer from "./container/ProductSelectContainer/index.js";
import OrderContainer from "./container/OrderContainer/index.js";

/* ----------------- Graphql Setup ----------------------- */

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, locationn, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://20.212.81.174/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

/* -------------------------------------------------------- */

function App() {
  return (
    <AuthProvider>
    <ApolloProvider client={client}>
      <Container className=" bg-container px-0">
        <Switch>
          <Route exact path="/">
            <HomeContainer />
          </Route>
            <GuestRoute path="/signup" component={SignupContainer}/>
            <GuestRoute path="/login" component={LoginContainer}/>
            <UserRoute path="/order" component={OrderContainer}/>
          <Route path="/products/:id">
            <ProductSelectContainer />
          </Route>
          <Route exact path="/products">
            <h4>no product</h4>
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
