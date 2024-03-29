import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SubmitAnimation from "../Animation/SubmitAnimation";
import {OrgReg } from "../../Utils/apiConnect";

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
    orgname:"",
      orgregno:"",
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
      orgname,
      orgregno,
      email,
      phone,
      pass,
    } = this.state;
    OrgReg(orgname,
      orgregno,
      email,
      phone,
      pass,
      
    )
    // let candidateName = `${orgname} ${orgregno}`;
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
      orgname,
      orgregno,
      email,
      phone,
      pass,
      User,
      currentState
    } = this.state;
    return (
      <div class="SignUp-Body">
  <div class="sign-up-container">
    <div class="sign-up-title">Sign Up Form - Organisation</div>
    <div class="sign-up-content">
      <form  
              className={classes.container + " form"}
              autoComplete="off"
              onSubmit={this.submitData}
            >
      
        <div class="user-details">
          <div class="input-box">
            <span class="details">Organisation Name</span>
            <input type="text" placeholder="Enter your name" required
            id="orgname"
            className={classes.textField}
            value={orgname}
            onChange={this.handleChange("orgname")}
            />
          </div>
          <div class="input-box">
            <span class="details">Registration number</span>
            <input type="text" placeholder="Enter your Registration number" required
            id="orgregno"
                  className={classes.textField}
                  value={orgregno}
                  onChange={this.handleChange("orgregno")}
                  />
          </div>
          <div class="input-box">
            <span class="details">Email</span>
            <input placeholder="Enter your email" required id="email"
            type="email"
            className={classes.textField}
            value={email}
            onChange={this.handleChange("email")} /> 
          </div>
          <div class="input-box">
            <span class="details">Phone Number</span>
            <input type="text" placeholder="Enter your number" required
            id="Phone"
                  className={classes.textField}
                  value={phone}
                  onChange={this.handleChange("phone")} />
          </div>
          <div class="input-box">
            <span class="details">Password</span>
            <input placeholder="Enter your password" required
            id="pwd"
            type="password"
                  className={classes.textField}
                  value={pass}
                  onChange={this.handleChange("pass")}
            
            />
          </div>
          <div class="input-box">
            <span class="details">Confirm Password</span>
            <input placeholder="Confirm your password" required 
            type="password"
            />
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
