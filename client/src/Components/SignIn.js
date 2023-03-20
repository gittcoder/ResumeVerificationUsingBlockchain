import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import ChainImage from "../Images/logo-securify.png";
import ChainImage2 from "../Images/logo-securify.png";

import signincss from "./signin.css"


import { login } from "../Utils/apiConnect";

const styles = theme => ({
  hidden: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  paper: {
    [theme.breakpoints.up("sm")]: {
      borderRadius: "5%",
      marginRight: 30
    },
    [theme.breakpoints.up(1150)]: {
      marginLeft: 50,
      width: 300
    },
    height: "75vh",
    marginTop: theme.spacing.unit * 6,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
    height: 100,
    width: 100
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  media: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  imgstyles: {
    maxWidth: "70vw",
    maxHeight: "90vh",
    [theme.breakpoints.down(1200)]: {
      marginTop: theme.spacing.unit * 4
    }
  }
});

class SignIn extends Component {

  state={
    currentState: "normal",
    UserName:"",
    Password:"",
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
      .then(data => {
        if (data.data !== undefined)
          this.setState({
            currentState: "validate",
          });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
   
    return (
      <div>
        <Grid container style={{ height: "100%" }}>

        <Grid className={classes.hidden}  item sm={false} md={8}>
          <div class="signIn-left">
            <img className="image-signin-logo" src={ChainImage} alt="chain" />
            <h1 class="signIn-text">Securify</h1>
      <p class="signIn-desc">Our mission at Securify is to provide a cutting-edge document verification service that leverages the power of blockchain technology to ensure the highest level of security and transparency. We aim to provide a reliable and efficient platform for individuals and businesses to verify the authenticity of their important documents, such as IDs, passports, and certificates, without the need for physical verification.</p>
<p class="signIn-desc">
Our goal is to utilize the immutability and decentralization of the blockchain to create a tamper-proof and verifiable digital record of each document verification. We believe that this approach can revolutionize the document verification process, providing a secure and trustworthy solution to prevent fraud, identity theft, and other malicious activities.</p>
            </div>
          </Grid>

          
          <Grid item sm={12} md={4}>
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockIcon style={{ fontSize: 70 }} />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="UserName">UserName</InputLabel>
                  <Input
                    id="UserName"
                    name="UserName"
                    autoComplete="UserName"
                    value={this.state.UserName}
                    onChange={this.handleChange("UserName")}
                    autoFocus
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={this.state.Password}
                    onChange={this.handleChange("Password")}
                  />
                </FormControl>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.submitData}
                >
                  Sign in
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignIn);
