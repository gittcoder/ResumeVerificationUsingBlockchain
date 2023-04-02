import React, { Component } from "react";
import "./App.css";
// import SignIn from "./Components/LoginSignUp/SignIn";

import { Switch, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Homepage from "./Components/HomePage/Homepage";
import Dashboard from "./Components/User/Dashboard";
import GenerateForm from './Components/Organisation/GenerateForm';
import SignUp from './Components/LoginSignUp/SignUp'
import history from './Utils/history'
import { CookiesProvider } from "react-cookie";
import viewCertificate from "./Components/User/viewCertificate"
import SignUpOptions from "./Components/LoginSignUp/SignUpOptions";
import OrgReg from "./Components/Organisation/OrgReg";
import OrgHome from "./Components/Organisation/OrgHome";
import Requests from "./Components/Organisation/Requests";
import LoginSignUp from "./Components/LoginSignUp/LoginSignUp";
import ContactUs from "./Components/ContactUs/ContactUs"
import AboutUs from "./Components/AboutUs/AboutUs"

class App extends Component {
  render() {
    return (
      <div className="App" style={{ backgroundColor: "#fafafa" }}>
        <CookiesProvider>
        <NavBar />
        
        <Switch history={history}>
          <Route exact path="/" component={Homepage} />
          <Route path="/login" component={LoginSignUp} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/OrgReg" component={OrgReg} />
          <Route path="/OrgHome" component={OrgHome} />
          <Route path="/SignUpOptions" component={SignUpOptions} />
          <Route path="/generate-certificate" component={GenerateForm} />
          <Route path="/display/certificate/:id" component={viewCertificate} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/Requests" component={Requests} />
          <Route path="/ContactUs" component={ContactUs} />
          <Route path="/AboutUs" component={AboutUs} />
        </Switch>
        </CookiesProvider>
      </div>
    );
  }
}

export default App;
