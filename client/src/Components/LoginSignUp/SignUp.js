import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SubmitAnimation from "../Animation/SubmitAnimation";
import { SignUp } from "../../Utils/apiConnect";
import "./SignUpCss.css";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.up("sm")]: { width: 250 },
    [theme.breakpoints.down("sm")]: { width: 200 }
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  paper: {
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing.unit,
      padding: `${theme.spacing.unit * 2}px`
    },
    minHeight: "75vh",
    maxWidth: "95%",
    margin: theme.spacing.unit * 5,
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 8}px ${theme
      .spacing.unit * 3}px`
  },
  rightpaper: {
    [theme.breakpoints.up("sm")]: {
      maxHeight: "75vh"
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "95%",
      margin: theme.spacing.unit * 2
    },
    maxWidth: "60%",
    minWidth: "60%",
    margin: theme.spacing.unit * 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  verificationBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyItems: "center",
    height: "100%",
    marginTop: theme.spacing.unit * 3
  },
  courseField: {
    [theme.breakpoints.up("sm")]: {
      width: "60%"
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "80vw"
    }
  },
  submitBtn: {
    marginLeft: "50px"
  }
});

class GenerateForm extends React.Component {
  state = {
    firstname:"",
      lastname:"",
      email:"",
      phone:"",
      gender:"",
      pass:"",
      User:"",
      currentState:"normal"
  };

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
      firstname,
      lastname,
      email,
      phone,
      gender,
      pass
    } = this.state;
    SignUp(firstname+lastname+phone,pass,firstname,
      lastname,
      email,
      phone,
      gender,
      
    )
    // let candidateName = `${firstname} ${lastname}`;
    // let assignDate = new Date(assignedOn).getTime();
    // generateCertificate(
    //   candidateName,
    //   coursename,
    //   organization,
    //   assignDate,
    //   parseInt(duration),
    //   emailId
    // )
      // .then(data => {
      //   if (data.data !== undefined)
      //     this.setState({
      //       currentState: "validate",
      //       User: data.data.User
      //     });
      // })
      // .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
    const {
      firstname,
      lastname,
      email,
      phone,
      gender,
      pass,
      User,
      currentState
    } = this.state;
    return (
      <div className="SignUp-Body">
      <div className="sign-up-container">
        <div className="sign-up-title">Registration</div>
        <div className="sign-up-content">
          <form action="#" className={classes.container + " form"}
          autoComplete="off"
          onSubmit={this.submitData}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">First Name</span>
                <input type="text" placeholder="Enter your name" required
                id="firstname"
                value={firstname}
                onChange={this.handleChange("firstname")}
                className={classes.textField}
                />
              </div>
              <div className="input-box">
                <span className="details">Last Name</span>
                <input type="text" placeholder="Enter your last" required
                id="lastname"
                className={classes.textField}
                value={lastname}
                onChange={this.handleChange("lastname")}
                
                />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input type="text" placeholder="Enter your email" required  
                id="email"
                      className={classes.textField}
                      value={email}
                      onChange={this.handleChange("email")}
                />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input type="text" placeholder="Enter your number" required
                id="Phone"
                      className={classes.textField}
                      value={phone}
                      onChange={this.handleChange("phone")}
                />
              </div>
              <div className="input-box">
                <span className="details">Password</span>
                <input type="text" placeholder="Enter your password" required
                id="pwd"
                      className={classes.textField}
                      value={pass}
                      onChange={this.handleChange("pass")}
                />
              </div>
              <div className="input-box">
                <span className="details">Confirm Password</span>
                <input type="text" placeholder="Confirm your password" required />
              </div>
            </div>
            
            <div className={" gender-details"}  id="gender" value={gender}
            onChange={this.handleChange("gender")}>
            <input type="radio" name="gender" id="dot-1" />
              <input type="radio" name="gender" id="dot-2" />
              <input type="radio" name="gender" id="dot-3" />
              <span className="gender-title">Gender</span>
              <div className="category">
                <label for="dot-1">
                <span className="dot one"></span>
                <span className="gender">Male</span>
              </label>
              <label for="dot-2">
                <span className="dot two"></span>
                <span className="gender">Female</span>
              </label>
              <label for="dot-3">
                <span className="dot three"></span>
                <span className="gender">Prefer not to say</span>
                </label>
              </div>
              
            </div>
            <p className= "submit-button-reg">
            <div className="sign-up-button"  >
              <input type="submit" value="Register"
              currentState={currentState}
              className={classes.submitBtn } />
            </div>
            </p>

          </form>
        </div>
      </div>
    
    </div>
    );
  }
}

GenerateForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GenerateForm);
