import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {
  Container
} from "@material-ui/core";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Snackbar from "./components/Snackbar/Snackbar";
import Toolbar from "./components/ToolBar/Toolbar"

const App: React.FC = () => {
  return (
    <Router>
      {/* show notification bar */}
      <Snackbar />
      
      <Toolbar />

      <Container style={{ padding: "40px 20px" }}>
        {/* router */}
        <Switch>
          <Route path={`/home`} component={Home} />
          <Route path={`/login`} component={Login} />
          <Route path={`/register`} component={Register} />
          <Redirect from={`/`} to={`/home`} />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
