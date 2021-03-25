import React, { useContext } from "react";
import { Switch } from "react-router-dom";
import { GlobalContext } from "context/GlobalState";
import Login from "views/public/Login";
import Admin from "views/private/Admin";
import PrivateRoute from "./private/PrivateRoute";
import PublicRoute from "./public/PublicRoute";

const Routes = () => {
  const { auth } = useContext(GlobalContext);

  return (
    <Switch>
      <PrivateRoute exact path="/admin" component={Admin} auth={auth} />
      <PublicRoute exact path="/" component={Login} auth={auth} />
    </Switch>
  );
};

export default Routes;
