import React from "react";
import { Redirect, Route } from "react-router";
import { authenticate } from "../services/authentication";

export default function ProtectedRoute({path,component : Component ,render , ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!authenticate.checkAuthenticate())
          return <Redirect to="/" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
}
