import React from "react";
import "./home-page-style.css";

import home1 from "../Images/home1.jpg";
import home2 from "../Images/home2.jpg";


function Homepage(props) {
  return (
    <div className="home-body">
    
    <div className="home">

<div className="home1">
  <div className="homepage-logo-title">
    <img className="sh" src={home2} />  <h1 className="home-title">Securify</h1></div>
    <p><b>Your professional reputations starts here</b></p>
    <p><b><i>Verify now!</i></b></p>
</div>

<div className="home2">
    <img className="ss" src={home1} />

</div>
</div>

<hr className="bottom-hr" />
<footer>
<div className="foot">

<div className="ft">
    <a className="footer-link" href="">English(India)</a>
    <a className="footer-link" href="">Help</a>
    <a className="footer-link" href="">Privacy</a>
    <a className="footer-link" href="">Terms</a>
    
</div>

</div>
</footer>
    </div>
  );
}

export default Homepage;
