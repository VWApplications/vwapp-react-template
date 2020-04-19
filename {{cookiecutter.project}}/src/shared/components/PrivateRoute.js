import React from "react";
import { Route, Redirect } from "react-router";
import { connect } from "react-redux";
import { Alert } from "vwapp-react-components";
import { hasPermission, isAuthenticated } from "shared/utils";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { requiredPermission, user, location } = rest;

  let permissions = "";
  if (user) {
    if (Object.prototype.hasOwnProperty.call(user, "type")) {
      permissions = user.type;
    } else {
      permissions = user.plan;
    }
  }

  if (!isAuthenticated()) {
    Alert.run(Alert.ERROR, "Permissão negada!", "Você precisa tá logado para realizar essa ação.");
    return <Redirect to="/login" />;
  }

  if (!hasPermission(requiredPermission, permissions)) {
    Alert.run(Alert.ERROR, "Permissão negada!", "Você não pode realizar essa ação.");
    const path = { pathname: "/profile", state: { user }}
    return <Redirect to={path} />;
  }

  if (location.key)
    return <Route {...rest} render={props => <Component {...props} />} />;

  Alert.run(Alert.ERROR, "Permissão negada!", "Por favor, não utilize a url como navegação.");
  return <Redirect to="/profile" />;
};

const mapStateToProps = state => {
  const { location } = state.router;

  let user = undefined;
  if (location.state) {
    return { user: location.state.user };
  }

  return { user };
};

export default connect(mapStateToProps)(PrivateRoute);
