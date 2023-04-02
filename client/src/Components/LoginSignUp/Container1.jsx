import React,{Component} from "react";
import logo from "../../Images/log.svg";
import register from "../../Images/register.svg";
import "./SignUpBoth.css";
import SignUpOrg from "../../Images/SignUp-org.jpeg";
import SignUpUser from "../../Images/SignUp-user.png";
import Button from "@material-ui/core/Button";
import history from "../../Utils/history";
import { login } from "../../Utils/apiConnect";


class Container1 extends Component{

  componentDidMount()
  {
    if(localStorage.getItem("user")!==null)
    {
      if(localStorage.getItem("privilege"==="normal"))
      history.push("/dashboard");
      else
      history.push("/OrgHome")
    }
  }

  state={
    currentState: "normal",
    UserName:"Username",
    Password:"Password",
  }


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };


  submitData = event => {
    event.preventDefault();
    if (this.state.currentState === "validate") {
      return;
    }
    this.setState({ currentState: "load" });
    const {
      UserName,
      Password,
    } = this.state;
    
    login(
      UserName,
      Password
    )
      
     
  };


  container = document.querySelector(".container");

  sign_up_btn_addEventListener=()=> {
    const container = document.querySelector(".container");

    container.classList.add("sign-up-mode");
  }

  sign_in_btn_addEventListener=()=> {
    const container = document.querySelector(".container");

    container.classList.remove("sign-up-mode");
  }

    render(){
  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder={this.state.UserName} onChange={this.handleChange("UserName")} />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder={this.state.Password} onChange={this.handleChange("Password")} />
            </div>
            <input type="submit" value="Login" className="btn solid" onClick={this.submitData} />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
       
          <form action="#" className="sign-up-form">
            {/* <h2 className="title">Sign up</h2>
          <div className="input-field">
            <i className="fas fa-user"></i>
            <input type="text" placeholder="Username" />
          </div>
          <div className="input-field">
            <i className="fas fa-envelope"></i>
            <input type="email" placeholder="Email" />
          </div>
          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" />
          </div>
          <input type="submit" className="btn" value="Sign up" /> */}
<h2 className="title">Sign up</h2>
            <div className="SignUp-page-first">
              <div className="SignUp-grid-container">
                <div className="SignUp-User Signup-grid-item">
                  <img src={SignUpUser} className="SignUp-img"></img>
                  <p>
                    <Button
                      type="submit"
                      variant="contained"
                      className="Normal-User"
                      onClick={()=>{history.push("/SignUp")}}
                    >
                      For Normal Users
                    </Button>
                  </p>
                </div>

                <div className="SignUp-Org Signup-grid-item">
                  <img src={SignUpOrg} className="SignUp-img"></img>
                  <p>
                    <Button
                      type="submit"
                      variant="contained"
                      color="##349EF4"
                      className="Org"
                      onClick={()=>{history.push("/OrgReg")}}
                    >
                      For Organizations
                    </Button>
                  </p>
                </div>

              </div>
            </div>

            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={this.sign_up_btn_addEventListener}
            >
              Sign up
            </button>
          </div>
          <img src={logo} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={this.sign_in_btn_addEventListener}
            >
              Sign in
            </button>
          </div>
          <img src={register} className="image" alt="" />
        </div>
      </div>
    </div>
  );
        }
}

export default Container1;
