import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/home/home";
import Login from "./components/login/login";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from './context/PrivateRoute'

function App() {

    return (
      <Router>
          <AuthProvider>
          <div style={{ display: "flex" }}>
            <Switch>
              {/* <Route exact path="/" component={Login} /> */}
              <PrivateRoute exact path="/sr" component={HomePage} />
              <Route exact path="/sr" component={HomePage} />
            </Switch>
          </div>
        </AuthProvider>
      </Router>
    );
}
export default App;
