import React from "react";
import { Router, Route, Switch } from "dva/router";
import IndexPage from "./routes/IndexPage";
import ExamplePage from "./routes/ExamplePage";
import UserPage from "./routes/UserPage";
import Test from "./routes/Test";

import { UserPageDynamic } from "./dynamic/index";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/example" component={ExamplePage} />
        {/* <Route path="/user" component={UserPageDynamic} /> */}
        <Route path="/user" component={UserPage} />
        <Route path="/test" component={Test} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
