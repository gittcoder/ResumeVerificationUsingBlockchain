import React from "react";
import "./home-page-style.css";

import home1 from "../Images/home1.jpg";
import home2 from "../Images/home2.jpg";


function Homepage(props) {
  return (
    <div class="home-body">
    
    <div class="home">

<div class="home1">
  <div class="homepage-logo-title">
    <img class="sh" src={home2} />  <h1 class="home-title">Securify</h1></div>
    <p><b>Your professional reputations starts here</b></p>
    <p><b><i>Verify now!</i></b></p>
</div>

<div class="home2">
    <img class="ss" src={home1} />

</div>
</div>

<hr class="bottom-hr" />
<footer>
<div class="foot">

<div class="ft">
    <a class="footer-link" href="">English(India)</a>
    <a class="footer-link" href="">Help</a>
    <a class="footer-link" href="">Privacy</a>
    <a class="footer-link" href="">Terms</a>
    
</div>

</div>
</footer>
    </div>
  );
}

export default Homepage;
