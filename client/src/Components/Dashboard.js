import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import history from "../Utils/history";
import { Typography,Card,CardContent,Fade } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";



class Dashboard extends Component{


  state=
  {
    certificates:[],
    requests:[],
    nav:false,
    reqid:0,
  }
componentDidMount()
{
  if(localStorage.getItem("user")===null)
  {
    history.push("/login");
  }

const getHeader = {
  headers: {
    Accept: "application/json"
  }
};
  const postHeader = {
    method: "POST",
    headers: {
      ...getHeader,
      "Content-Type": "application/json"
    }
  };
    console.log(localStorage.getItem("user"));
    fetch(`http://localhost:3000/certificateList`, {
      ...postHeader,
      body: JSON.stringify({
        email:localStorage.getItem("user"),
        pass:localStorage.getItem("pwd")
      })
    })
      .then(async res =>{ if(res.status===200)
        {
          await res.json().then(
            (body)=>{
              let c=[]
              let cert = JSON.parse(body["0"])
              // console.log(body["1"]);
              cert.forEach((entries)=>
              {
                c.push(entries["obj"]);
              
              })
              this.setState({certificates:c})
              console.log(JSON.parse(body["1"]))
              let req = JSON.parse(body["1"])
              c=[]
              req.forEach((entries)=>
              {
                  c.push(entries);
              
              })
              this.setState({requests:c})
              
              console.log(this.state.requests[this.state.reqid].OrgName);
             }
          )
          
          // localStorage.setItem('user',UserName)
          // localStorage.setItem('pwd',Password)
          // // setCookie('user',UserName, { path: '/' });
          // history.push('/dashboard');
      }})
      .catch(err => {
        console.log(err);
      });
}

    render(){
        return(
            <div style={{
              display:"flex",
                flexDirection:"column",
                flexFlow:"column wrap",
              
            }}>

              <div className="certificates">
                <Typography component="h1" variant="h3" style={{position:"relative",top:"13%",left:"6%"}}>
                My Certificates
              </Typography>
              <div style={{
                display:"flex",
                flexDirection:"row",
                flexFlow:"row wrap",
                backgroundColor:"#4d76af",
                margin:"10px 10px 10px",
                borderRadius:"20px",
                width:"90%",
                position:"relative",
                top:"20%",
                left:"2%",
                height:"auto"

              }}>
              {this.state.certificates.map((item, index) => (
                <Grid
                className="entry"
        container
        sx={{
          width: "70vw",
          height: "120vh",
        }}
        >
          <Card className={"c"+index} key={index} 
          sx={{boxShadow: "10px 10px 20px rgb(30,30,30)"}}
          style={{width:"15vw",height:"20vh",borderRadius:"20px",position:"relative",left:"2%",marginTop:"20px",marginBottom:"20px"}}>
            <Typography style={{fontSize:"30px"}} >{item.courseName}</Typography>
            <Typography style={{fontSize:"15px"}}>Organization : {item.orgName}</Typography>
            <Typography style={{fontSize:"15px"}}>Date : {new Date(item.assignDate).toString().slice(4, 15)}</Typography>

            
        
            <Button
            style={{position:"relative",top:"10%",left:"35%",marginBottom:"30px"}}
            className={"b"+index}
            onClick={()=>{history.push("/display/certificate/"+item._id)}}
            variant="outlined"
            color="primary"
            >
              View</Button>
          </Card>
          </Grid>
        ))}
        </div>
        </div>

        <div className="requests">
        <Typography component="h1" variant="h3" style={{position:"relative",top:"13%",left:"6%"}}>
                Requests
              </Typography>
              <div style={{
                display:"flex",
                flexDirection:"row",
                flexFlow:"row wrap",
                backgroundColor:"#4d76af",
                margin:"10px 10px 10px",
                borderRadius:"20px",
                width:"90%",
                position:"relative",
                top:"120%",
                left:"2%",
                height:"auto"

              }}>
              {this.state.requests.map((item, index) => (
                <Grid
                className="entry"
        container
        sx={{
          width: "70vw",
          height: "120vh",
        }}
        >
          <Card className={"c"+index} key={index} 
          sx={{boxShadow: "10px 10px 20px rgb(30,30,30)"}}
          style={{width:"15vw",height:"20vh",borderRadius:"20px",position:"relative",left:"2%",marginTop:"20px",marginBottom:"20px"}}> 
            <Typography style={{fontSize:"15px"}}>Organization : {item.OrgName}</Typography>

            
        
            <Button
            style={{position:"relative",top:"10%",left:"35%",marginBottom:"30px"}}
            className={"b"+index}
            onClick={()=>{this.setState({nav:true,reqid:index})}}
            variant="outlined"
            color="primary"
            >
              View</Button>
          </Card>
          </Grid>
        ))}
        </div>
        <div style={{position:"absolute",top:"15%",left:"15%"}}>
        <Fade in={this.state.nav}>
                    <Grid
                        className="entry"
                        container
                        sx={{
                        width: "600vw",
                        height: "600vh",
                        alignItems: "center",
                        justifyContent: "center",
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
                            height: "60%",
                            borderRadius: "1.5rem",
                            boxShadow: "0 10px 20px rgb(30,30,30)",
                            padding:"20px",
                            position:"absolute",
                            
                        }}
                        >
                        <CardContent className="available-class-pop">
                        <Typography sx={{ fontSize: 40 }} color="text.secondary" gutterBottom >
                        Available Classes
                        </Typography>
                        <div style={{ flex: "1",overflowY:"scroll",height:"20%"}}>
                        {/* {EmptyClasses()} */}
                        {/* <Typography style={{fontSize:"15px"}}>Organization : {this.state.certificates[this.state.reqid].OrgName}</Typography> */}
                        </div>
                            <Button variant="contained" 
                            onClick={()=>{this.setState({nav:false})}}
                               sx={{
                                width: "30%",
                                height: "6vh",
                                position:"absolute",
                                margin:"20px",
                                top:"45vh",
                                left:"20vw",
                            }}>Back</Button>
                        </CardContent>
                        </Card>
                    </Grid>
                    </Fade>
                    
        </div>
        </div>
        
                
            </div>
        )
    }
}

export default Dashboard;