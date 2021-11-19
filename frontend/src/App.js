import { useState } from "react";
import { Container } from "react-bootstrap";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import HomeContainer from "./container/HomeContainer/index.js";
import SignupContainer from "./container/SignupContainer/index.js";
import LoginContainer from "./container/LoginContainer/index.js";
import Footer from "./components/Footer/index.js";
import ProductSelectContainer from "./container/ProductSelectContainer/index.js";
import AdminContainer from "./container/AdminContainer/index.js";

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
  new HttpLink({ uri: "http://localhost:8000/graphql " }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

/* -------------------------------------------------------- */

function App() {
  return (
    <ApolloProvider client={client}>
      <Container className=" bg-container px-0">
        <Switch>
          <Route exact path="/">
            <HomeContainer />
          </Route>
          <Route path="/signup">
            <SignupContainer />
          </Route>
          <Route path="/login">
            <LoginContainer />
          </Route>
          <Route path="/product">
            <ProductSelectContainer />
          </Route>
          <Route path="/admin/:id" component={AdminContainer} />
          <Route path="/:id">
            <p>Page not found</p>
          </Route>
        </Switch>
        <Footer />
      </Container>
    </ApolloProvider>
  );
}

export default App;
