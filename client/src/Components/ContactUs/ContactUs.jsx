import "./contact-us-css.css";
import location from "../../Images/location.png";
import email from "../../Images/email.png";
import shape from "../../Images/shape.png";

import phone from "../../Images/phone.png" ;

import "./contact-usjs.js";

function ContactUs() {
  return (
     <div className="contact-us-container">
      <span className="big-circle"></span>
      <img src={shape} className="square" alt="" />
      <div className="contact-us-form">
        <div className="contact-info">
          <h3 className="title">Let's get in touch</h3>
          <p className="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            dolorum adipisci recusandae praesentium dicta!
          </p>

          <div className="info">
            <div className="information">
              <img src={location} className="icon" alt="" />
              <p>92 Cherry Drive Uniondale, NY 11553</p>
            </div>
            <div className="information">
              <img src={email} className="icon" alt="" />
              <p>lorem@ipsum.com</p>
            </div>
            <div className="information">
              <img src={phone} className="icon" alt="" />
              <p>123-456-789</p>
            </div>
          </div>

          <div className="social-media">
            <p>Connect with us:</p>
            <p>
            <div className="social-icons">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
           
            </p>
          </div>
        </div>

        <div className="contact-form">
          <span className="circle one"></span>
          <span className="circle two"></span>

          <form action="/" autocomplete="off" className="Contact-us-form">
            <h3 className="title">Contact us</h3>
            <div className="input-container">
              <input type="text" name="name" className="input-contact-us" placeholder="Username" />
              <span>Username</span>
            </div>
            <div className="input-container">
              <input type="email" placeholder="email" className="input-contact-us" name="email" />
              {/* <label for="">Email</label> */}
              <span>Email</span>
            </div>
            <div className="input-container">
              <input type="tel" name="phone" className="input-contact-us" placeholder="phone"/>
              {/* <label for="">Phone</label> */}
              <span>Phone</span>
            </div>
            <div className="input-container textarea">
              <textarea name="message" className="input-contact-us" placeholder="Any Message for us"></textarea>
              {/* <label for="">Message</label> */}
              <span>Message</span>
            </div>
            <input type="submit" value="Send" className="btn" />
          </form>
        </div>
      </div>
    </div>

  );
}

export default ContactUs;
