import React, { Component } from "react";
import "./App.css";
import SignIn from "./Components/SignIn";

import { Switch, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Homepage from "./Components/Homepage";
import Dashboard from "./Components/Dashboard";
import GenerateForm from './Components/GenerateForm';
import SignUp from './Components/SignUp'

class App extends Component {
  render() {
    return (
      <div className="App" style={{ backgroundColor: "#fafafa" }}>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/login" component={SignIn} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/generate-certificate" component={GenerateForm} />
          <Route path="/display/certificate/:id" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default App;
