import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

function AdminProtectedRoute({ component: Component, Auth, history, res }) {
  // Ang Auth ipapasa natin sa component. console.log muna tayo tingan mo to
  //Kung mag bbrowse tayo sa home yung component na yan ay Search
  //So sa search kukunin nating yang Auth as props
  console.log(Auth);
  return (
    <Route
      {...res}
      render={(props) =>
        Auth.state.isAuthenticated && Auth.state.userData.myStatus == "home" ? (
          <Component Auth={Auth} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default withRouter(AdminProtectedRoute);
