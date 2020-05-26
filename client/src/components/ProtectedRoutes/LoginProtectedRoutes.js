import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

function LoginProtectedRoutes({ component: Component, Auth, history, res }) {
  return (
    <Route
      {...res}
      render={(props) =>
        Auth.state.isAuthenticated ? (
          <Redirect
            to={{
              pathname: `/${Auth.state.userData.myStatus}`,
              state: { from: props.location },
            }}
          />
        ) : (
          <Component />
        )
      }
    />
  );
}

export default withRouter(LoginProtectedRoutes);
