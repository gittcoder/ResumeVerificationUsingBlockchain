import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { fade } from "@material-ui/core/styles/colorManipulator";
import withStyles from "@material-ui/core/styles/withStyles";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import Link from "react-router-dom/Link";
import history from "../Utils/history";
import { Button } from "@material-ui/core";
import imgLogo from "../Images/logo-securify.png";
import navbarcss from "./navbarcss.css";


const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

class NavBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    status:"Log In",
    display:"none",
  };

  componentDidMount()
  {
    if(localStorage.getItem("user")==null)
    {
      this.setState({status:"Log In",display:"none"});
    }
    else
    {
      this.setState({status:"Log Out",display:"block"});
    }
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);



    

    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Icon"
              component={Link}
              to="/"
            >
              <HomeIcon color="inherit" />
            </IconButton>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >


<div class="logo-securify-navbar">
              <img src={imgLogo} class="navbar-logo"></img>
              <span class="navbar-securify">Securify
              </span>

              </div>
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
          <div class="navbar-options" style={{display:"flex"}}>
              <IconButton color="inherit"
              onClick={()=>{if(localStorage.getItem("user")===null)
                              {history.push("/login")}
                              else{history.push("/dashboard")}}}
                style={{display:this.state.display}}>
         
                  Dashboard
       
              </IconButton>

              <IconButton color="inherit"
              onClick={()=>{history.push("/AboutUs")}}>
               
                  About Us
              
              </IconButton>
              <Button variant="outlined" color="inherit" style={{color:"white",borderColor:"white"}}
              onClick={()=>{if(localStorage.getItem("user")===null)
              {
                history.push("/login")}
              else{localStorage.removeItem("user");
              localStorage.removeItem("pwd");
                history.push("/")}}}>
                {this.state.status}
              </Button>
              
              </div>


              <IconButton
                aria-owns={isMenuOpen ? "material-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
       
        
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
