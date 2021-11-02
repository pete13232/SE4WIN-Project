import { useState } from "react";
import NavbarBootstrap from "./components/NavbarBootstrap";
import Category from "./components/Category";
import Product from "./components/Product";
import Footer from "./components/Footer";
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
  new HttpLink({ uri: "http://localhost:5000/graphql " }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

/* -------------------------------------------------------- */

function App() {

  return (
    <div>
      <Container className="px-0" style={{ background: "#EAEAEA" }}>
        <Switch>
          <Route exact path="/">
            <NavbarBootstrap themeStatus = {false}/>
            <Category />
            <Product />
            <Footer />
          </Route>
          <Route exact path="/signup">
            <NavbarBootstrap themeStatus = {true}/>
            <h1>signup</h1>
          </Route>
          <Route exact path="/login">
            <NavbarBootstrap themeStatus = {true}/>
            <h1>login</h1>
          </Route>
          <Route path="/:id">
            <h1>No page</h1>
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
