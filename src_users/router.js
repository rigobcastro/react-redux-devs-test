import React from "react";
import { Router, Route, IndexRoute } from "react-router";

import { history } from "./store.js";
import App from "./components/App";
import Welcome from "./components/Welcome";
import TableList from "./components/TableList";
import NewUser from "./components/NewUser";
import EditUser from "./components/EditUser";

// build the router
const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={TableList} />
      <Route path="/create" component={NewUser} />
      <Route path="/edit/:id" component={EditUser} />
      <Route path="/welcome" component={Welcome} />
    </Route>
  </Router>
);

// export
export { router };
