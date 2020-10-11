import React, { Fragment } from "react";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import Camera from "./components/Camera";

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
              <Redirect to="/camera" {...props} />
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
