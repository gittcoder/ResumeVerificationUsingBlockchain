import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import history from "../../Utils/history";
import {
  Typography,
  Card,
  CardContent,
  Fade,
  IconButton,
  MenuItem,
  TextField,
} from "@material-ui/core";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import Grid from "@material-ui/core/Grid";
import { ApproveRequests } from "../../Utils/apiConnect";
import VerifyBadge from "../Animation/VerifyBadge";
import "./Dashboard-css.css";
class Dashboard extends Component {
  state = {
    certificates: [],
    requests: [],
    nav: false,
    reqid: 0,
    orgname: "",
    message: "",
    status: "",
    addCer: "",
    added: [],
    shared: "",
    approved: false,
    display: "0",
  };

  handleAdd = (event) => {
    event.preventDefault();
    this.state.certificates.map((item) => {
      if (item._id === this.state.addCer) {
        // this.setState({
        //   added:[...this.state.added,this.state.addCer],
        //   shared:this.state.shared+","+this.state.addCer
        // });
        this.setState({
          added: [
            ...this.state.added,
            { _id: item._id, orgname: item.orgName, title: item.courseName },
          ],
        });
      }
    });

    console.log(this.state.addCer);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.currentState === "validate") {
      return;
    }
    this.setState({ currentState: "load" });
    let shared = "";
    this.state.added.map((item) => {
      shared += item._id + ":" + item.title + ",";
    });
    console.log(localStorage.getItem("orgname"));
    ApproveRequests(
      localStorage.getItem("user"),
      localStorage.getItem("pwd"),
      shared,
      this.state.requests[this.state.reqid]["_id"]
    );

    // let candidateName = `${firstname} ${Message}`;
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

  handleRemove = (x) => (event) => {
    console.log("Inside remove");
    event.preventDefault();
    let c = [];
    this.state.added.map((item, index) => {
      if (index !== x) {
        c.push(item);
      }
    });
    this.setState({ added: c });
  };

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentDidMount() {
    if (localStorage.getItem("user") === null) {
      history.push("/login");
    }

    const getHeader = {
      headers: {
        Accept: "application/json",
      },
    };
    const postHeader = {
      method: "POST",
      headers: {
        ...getHeader,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
    };
    console.log(localStorage.getItem("user"));
    fetch(`https://securifybackend.onrender.com/certificateList`, {
      ...postHeader,
      body: JSON.stringify({
        email: localStorage.getItem("user"),
        pass: localStorage.getItem("pwd"),
      }),
    })
      .then(async (res) => {
        if (res.status === 200) {
          await res.json().then((body) => {
            let c = [];
            let cert = JSON.parse(body["0"]);
            console.log(body["0"]);
            cert.forEach((entries) => {
              c.push(entries["obj"]);
            });
            this.setState({ certificates: c });
            console.log(this.state.certificates);
            let req = JSON.parse(body["1"]);
            c = [];
            req.forEach((entries) => {
              c.push(entries);
            });
            this.setState({ requests: c });

            console.log(this.state.requests[this.state.reqid].OrgName);
          });

          // localStorage.setItem('user',UserName)
          // localStorage.setItem('pwd',Password)
          // // setCookie('user',UserName, { path: '/' });
          // history.push('/dashboard');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div
        className="dashboard-page"
        style={{
          display: "flex",
          flexDirection: "column",
          flexFlow: "column wrap",
        }}
      >
        <div className="certificates-dashboard">
          <h2 className="dashboard-certificates-heading">My Certificates</h2>
          {this.state.certificates.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexFlow: "row wrap",
                backgroundColor: "#2096F3",
                margin: "10px 10px 10px",
                borderRadius: "10px",
                width: "90%",
                position: "relative",
                top: "120%",
                left: "6%",
                height: "auto",
              }}
            >
              <span
                style={{ color: "white" }}
                className="certificate-view-dashboard"
              >
                No Records Found..!
              </span>
            </div>
          ) : (
            <div className="certificate-list-dashboard">
              {this.state.certificates.map((item, index) => (
                <div
                  className={"c" + index+ " "+ "dashboard-user-certificate" } 
                  key={index}
                >
                  <div class="certificate-details-view">
                  <p className="course-page-view" style={{ fontSize: "30px" }}>
                    {item.courseName}
                  </p>
                  <p className="view-org-name" style={{ fontSize: "15px" }}>
                    Organization : {item.orgName}
                  </p>
                  <p className="view-date-certificate" style={{ fontSize: "15px" }}>
                    Date : {new Date(item.assignDate).toString().slice(4, 15)}
                  </p>
</div>
                  {/* <p><button type="button"
                      className={"b" + index+ "button-view-certificate"}
                      onClick={() => {
                        history.push("/display/certificate/" + item._id);
                      }}
                      variant="outlined"
                      color="primary"
                    >   View
                    </button> </p> */}
                  <div
                    className="button-view-certificate"
                    id="button-6"
                    onClick={() => {
                      history.push("/display/certificate/" + item._id);
                    }}
                  >
                    <div id="spin"></div>
                    <a className="view-certificate-a" href="#">
                      View
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="dashboard-request">
          <h2 clasName="dashboard-request-heading">Requests</h2>

          {this.state.requests.length === 0 ? (
             <div
             style={{
               display: "flex",
               flexDirection: "row",
               flexFlow: "row wrap",
               backgroundColor: "#2096F3",
               margin: "10px 10px 10px",
               borderRadius: "10px",
               width: "90%",
               position: "relative",
               top: "120%",
               left: "6%",
               height: "auto",
             }}
           >
             <span
               style={{ color: "white" }}
               className="certificate-view-dashboard"
             >
               No Records Found..!
             </span>
           </div>
          ) : (
            <div
            className="request-list-dashboard"
            >











{/* 

<div className="certificate-list-dashboard">
              {this.state.certificates.map((item, index) => (
                <div
                  className={"c" + index+ " "+ "dashboard-user-certificate" } 
                  key={index}
                >
                  <div class="certificate-details-view">
                  <p className="course-page-view" style={{ fontSize: "30px" }}>
                    {item.courseName}
                  </p>
                  <p className="view-org-name" style={{ fontSize: "15px" }}>
                    Organization : {item.orgName}
                  </p>
                  <p className="view-date-certificate" style={{ fontSize: "15px" }}>
                    Date : {new Date(item.assignDate).toString().slice(4, 15)}
                  </p>
</div>
                 
                  <div
                    className="button-view-certificate"
                    id="button-6"
                    onClick={() => {
                      history.push("/display/certificate/" + item._id);
                    }}
                  >
                    <div id="spin"></div>
                    <a className="view-certificate-a" href="#">
                      View
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
 */}

              {this.state.requests.map((item, index) => (
                  <div
                    className={"c" + index+" request-item-dashboard"}
                    dashboard-user-request
                    key={index}
                    sx={{ boxShadow: "10px 10px 20px rgb(30,30,30)" }}
                  >

                    <p className="request-details-view" style={{ fontSize: "15px" }}>
                      Organization : {item.OrgName}
                    </p>


{/* 
<div
className="button-view-certificate"
id="button-6"
onClick={() => {
  history.push("/display/certificate/" + item._id);
}}
>
<div id="spin"></div>
<a className="view-certificate-a" href="#">
  View
</a>
</div> */}


                    <div
                      className={"b" + index+ " button-request-certificate"}
                      id="button-6"
                      onClick={() => {
                        if (this.state.requests[index].Status === "approved") {
                          this.setState({ approved: true, display: "0" });
                        } else {
                          this.setState({ approved: false, display: "1" });
                        }
                        this.setState({
                          added: [],
                          nav: true,
                          reqid: index,
                          orgname: this.state.requests[index].OrgName,
                          status: this.state.requests[index].Status,
                          message: this.state.requests[index].Message,
                        });
                        console.log(
                          this.state.requests[this.state.reqid].OrgName
                        );
                      }}
                    >
                      <div id="spin"></div>
<a className="view-certificate-a" href="#">
  View
</a>
                
                    </div>
                  </div>
              
              ))}
            </div>
          )}

          <div className="Card">
            <Fade in={this.state.nav}>
              <Grid
                className="entry"
                container
                sx={{
                  width: "600vw",
                  height: "500vh",

                  color: "black",
                }}
              >
                <Card
                  sx={{
                    width: {
                      xs: "70%",
                      sm: "70%",
                      md: "80%",
                      lg: "60%",
                    },
                    height: "500vh",
                    borderRadius: "10rem",
                    boxShadow: "0 10px 20px rgb(30,30,30)",
                  }}
                >
                  <CardContent className="available-class-pop">
                    <IconButton
                      variant="contained"
                      color="error"
                      onClick={() => {
                        this.setState({ nav: false });
                      }}
                      sx={{
                        width: "30%",
                        height: "6vh",
                      }}
                    >
                      <CancelPresentationIcon color="error" />
                    </IconButton>
                    <Typography
                      sx={{ fontSize: 40 }}
                      style={{ marginTop: "20px" }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Request ID : {this.state.reqid}
                    </Typography>

                    {/* <div style={{ flex: "1",overflowY:"scroll",height:"20%"}}> */}
                    {/* {EmptyClasses()} */}
                    <div>
                      <p style={{ fontSize: "15px", justifyContent: "left" }}>
                        Organization : {this.state.orgname}
                      </p>
                      <p style={{ fontSize: "15px", justifyContent: "left" }}>
                        Status : {this.state.status}
                      </p>
                      <p style={{ fontSize: "15px", justifyContent: "end" }}>
                        Message :{" "}
                      </p>

                      <div>
                        <p
                          style={{
                            margin: "20px 20px 20px",
                            border: "2px solid blue",
                            width: "80%",
                            marginBottom: "3vh",
                          }}
                        >
                          {this.state.message}
                        </p>
                      </div>

                      <div
                        className="added Certificates"
                        style={{
                          position: "relative",
                          top: "10%",
                          left: "10%",
                        }}
                      >
                        {this.state.added.map((item, index) => (
                          <div>
                            <Grid
                              key={index}
                              style={{
                                position: "relative",
                                top: "10%",
                                left: "10%",
                              }}
                              container
                            >
                              <Grid item>
                                <Typography>
                                  {item.orgname + "-" + item.title}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Button onClick={this.handleRemove(index)}>
                                  X
                                </Button>
                              </Grid>
                            </Grid>
                          </div>
                        ))}
                      </div>
                      <div
                        className="ChooseCertificates"
                        style={{
                          position: "relative",
                          top: "20%",
                          left: "10%",
                          marginTop: "2vh",
                          opacity: this.state.display,
                        }}
                      >
                        <TextField
                          id="filled-select-currency"
                          select
                          label="Select Certificate"
                          value={this.state.addCer}
                          onChange={this.handleChange("addCer")}
                          color="primary"
                          variant="outlined"
                          style={{
                            width: "10vw",
                            height: "10vh",
                          }}
                        >
                          {this.state.certificates.map((option) => (
                            <MenuItem key={option._id} value={option._id}>
                              {option.OrgName}-{option.courseName}
                            </MenuItem>
                          ))}
                        </TextField>
                        <Button
                          color="primary"
                          variant="contained"
                          style={{
                            height: "7vh",
                            position: "relative",
                            top: "40%",
                            left: "10%",
                          }}
                          onClick={this.handleAdd}
                        >
                          Add +
                        </Button>
                      </div>
                      {this.state.approved === true ? (
                        <VerifyBadge />
                      ) : (
                        <Button
                          color="primary"
                          variant="contained"
                          style={{
                            position: "relative",
                            top: "220%",
                            left: "35%",
                          }}
                          onClick={this.handleSubmit}
                        >
                          Approve
                        </Button>
                      )}
                    </div>
                    {/* </div> */}
                  </CardContent>
                </Card>
              </Grid>
            </Fade>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
