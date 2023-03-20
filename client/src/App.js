import React, { Component } from "react";
import "./App.css";
import SignIn from "./Components/SignIn";

import { Switch, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Homepage from "./Components/Homepage";
import Dashboard from "./Components/Dashboard";
import GenerateForm from './Components/GenerateForm';
import SignUp from './Components/SignUp'
import history from './Utils/history'
import { CookiesProvider } from "react-cookie";
import viewCertificate from "./Components/viewCertificate"

class App extends Component {
  render() {
    return (
      <div className="App" style={{ backgroundColor: "#fafafa" }}>
        <CookiesProvider>
        <NavBar />
        
        <Switch history={history}>
          <Route exact path="/" component={Homepage} />
          <Route path="/login" component={SignIn} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/generate-certificate" component={GenerateForm} />
          <Route path="/display/certificate/:id" component={viewCertificate} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
        </CookiesProvider>
      </div>
    );
  }
}

export default App;
