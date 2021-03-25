import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, path, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !auth ? <Component {...props} /> : <Redirect to="/admin" />
    }
  />
);

export default PublicRoute;
