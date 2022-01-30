import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";
import Login from "../pages/login";

// context
import { useUserState } from "../context/UserContext";

export default function App() {
  // global
  var { isAuthenticated } = useUserState();

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/add-user" />}
        />

        <PrivateRoute path="/app" component={Layout} />
        <Route path="/login" component={Login} />
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }
}
