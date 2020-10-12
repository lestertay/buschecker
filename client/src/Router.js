import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Camera from "./components/Camera";
import Dashboard from "./components/Dashboard"

function Router(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => (
            <Fragment>
              {/* can have some login for auth checking here */}
              <Dashboard/>
            </Fragment>
          )}
        />

        <Route
          path="/camera"
          exact
          render={(props) => (
            <Fragment>
              <Camera {...props} />
            </Fragment>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
