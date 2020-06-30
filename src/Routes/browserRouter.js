import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../components/Home/Home";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import Sources from "../components/Sources/Sources";
function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route key="login" exact path="/login" render={() => <Login />} />
        <Route key="signup" exact path="/register" render={() => <Signup />} />
        <ProtectedRoute
          key="home"
          exact
          path="/"
          render={() => <Home value={0} />}
        />
        <ProtectedRoute
          key="sources"
          exact
          path="/sources"
          render={() => <Sources value={1} />}
        />
        <Route path="*" render={() => "404 Not Found"} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
