import React from "react";
import { Route, Redirect } from "react-router-dom";
import { decodeToken } from "../services/tokenService";

const ProtectedRoute = (props) => {
  try {
    // checking if there is a valid token in localStorage
    decodeToken();
    return <Route {...props} />;
  } catch (error) {
    return <Redirect to={{ pathname: "/login" }} />;
  }
};

export default ProtectedRoute;
