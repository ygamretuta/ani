import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";

// custom pages
import GqlPage from "views/GqlPage/GqlPage.js";
import FirebaseDb from "views/FirebaseDb";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"; 

var hist = createBrowserHistory();

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <Router history={hist}>
    <ApolloProvider client={client}>
      <Switch>
        <Route path="/firedb" component={FirebaseDb} />
        <Route path="/gql-page" component={GqlPage} />
        <Route path="/landing-page" component={LandingPage} />
        <Route path="/profile-page" component={ProfilePage} />
        <Route path="/login-page" component={LoginPage} />
        <Route path="/" component={Components} />
      </Switch>
    </ApolloProvider>
  </Router>,
  document.getElementById("root")
);
