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
import { onError } from "@apollo/client/link/error";
import HomeContainer from "./container/HomeContainer/index.js";
import LoginContainer from "./container/LoginContainer/index.js";

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
    <ApolloProvider client = { client }>
      <Switch>
        <Route exact path="/">
          <HomeContainer />
        </Route>
        <Route path="/login"></Route>
        <Route path="/:id">
          <p>Page not found</p>
        </Route>
      </Switch>
    </ApolloProvider>
  );
}

export default App;
