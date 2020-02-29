import React from "react";
import { ToastContainer } from "react-toastify";

import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Report from "./containers/Reports";
import ChangePassword from "./containers/ChangePassword";
import Login from "./containers/Login";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./containers/Dashboard";
import Loader from "./components/Loader";

const AsyncDashboard = React.lazy(() => import("./containers/Dashboard"));

const Routing = props => (
  <Router>
    <Switch>
      <Route exact path="/" render={props => <Report {...props} />} />
      <Route path="/login" component={Login} />
      <Route
        exact
        path="/change-password"
        render={props => <ChangePassword {...props} />}
      />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute
        path="/"
        component={
          process.env.NODE_ENV === "development" ? (
            Dashboard
          ) : (
            <Suspense fallback={<Loader />}>
              <AsyncDashboard />
            </Suspense>
          )
        }
      />
    </Switch>
    <ToastContainer />
  </Router>
);
export default Routing;
