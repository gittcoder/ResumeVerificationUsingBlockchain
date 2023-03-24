import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SubmitAnimation from "./SubmitAnimation";
import { SignUp } from "../Utils/apiConnect";

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
      <Grid container>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <Typography variant="h3" color="inherit">
             Sign Up Form
            </Typography>
            <form
              className={classes.container}
              autoComplete="off"
              onSubmit={this.submitData}
            >
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="firstname"
                  label="First Name"
                  className={classes.textField}
                  value={firstname}
                  onChange={this.handleChange("firstname")}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  required
                  id="lastname"
                  label="Last Name"
                  className={classes.textField}
                  value={lastname}
                  onChange={this.handleChange("lastname")}
                  margin="normal"
                  variant="outlined"
                />
                
              </Grid>
             
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="email"
                  label="Email"
                  className={classes.textField}
                  type="email"
                  name="email"
                  autoComplete="email"
                  margin="normal"
                  variant="outlined"
                  value={email}
                  onChange={this.handleChange("email")}
                />
                <TextField
                  required
                  id="Phone"
                  label="Phone"
                  className={classes.textField}
                  value={phone}
                  onChange={this.handleChange("phone")}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  required
                  id="gender"
                  label="gender"
                  className={classes.textField}
                  value={gender}
                  onChange={this.handleChange("gender")}
                  margin="normal"
                  variant="outlined"
                />
                
                <TextField
                  required
                  id="pwd"
                  label="Password"
                  className={classes.textField}
                  value={pass}
                  onChange={this.handleChange("pass")}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <SubmitAnimation
                  currentState={currentState}
                  className={classes.submitBtn}
                />
                {currentState === "validate" && (
                  <Typography
                    variant="caption"
                    color="inherit"
                    className={classes.submitBtn}
                  >
                    Certificate genrated with id {User}
                  </Typography>
                )}
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

GenerateForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GenerateForm);
