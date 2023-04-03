import React,{Component} from "react";
import history from "../../Utils/history";
import Button from "@material-ui/core/Button";
import { Typography,Card,CardContent,Fade,IconButton,MenuItem,TextField } from "@material-ui/core";
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import Grid from "@material-ui/core/Grid";
import { OrgViewRequests } from "../../Utils/apiConnect";
import certificate_generation from "../../Images/hold-certificate-final.jpeg";
import certifcate_request from "../../Images/man-holding.jpeg"
import "./OrgOptions.css"

import VerifyBadge from "../Animation/VerifyBadge";
const styles = theme => ({
   
    submitBtn: {
      marginLeft: "50px"
    }
  });

class OrgHome extends Component
{
  state=
  {
    certificates:[],
    requests:[],
    nav:false,
    reqid:0,
    orgname:"",
    message:"",
    status:"",
    addCer:"",
    added:[],
    shared:"",
    approved:false,
    display:"0",

  }

  handleAdd = event =>
  {
    event.preventDefault();
    this.state.certificates.map((item)=>
    {
      if(item._id===this.state.addCer)
      {
        // this.setState({
        //   added:[...this.state.added,this.state.addCer],
        //   shared:this.state.shared+","+this.state.addCer
        // });
        this.setState({added:[...this.state.added,{_id:item._id,orgname:item.orgName,title:item.courseName}]})
      }
    })
    


    console.log(this.state.addCer)
  }


  handleSubmit = event => {
    event.preventDefault();
    if (this.state.currentState === "validate") {
      return;
    }
    this.setState({ currentState: "load" });
   let shared=""
   this.state.added.map((item)=>
   {
    shared+=item._id+",";
   })
    console.log(localStorage.getItem("orgname"))
    OrgViewRequests(localStorage.getItem("user"),
      localStorage.getItem("pwd"),
      shared,
      this.state.requests[this.state.reqid]["_id"]
      
      
    )
    
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

  handleRemove = x => event =>
  {
    console.log("Inside remove")
    event.preventDefault();
    let c= []
    this.state.added.map((item,index)=>
    {
       if(index!==x)
       {
          c.push(item);
       }
    })
    this.setState({added:c})

  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

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
    fetch(`http://localhost:3000/ViewRequests`, {
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
              let req = JSON.parse(body)
          
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
    render()
    {
        return(

            <div className="main-frame-org">
                <div className="grid-container">
                <div className="grid-item ">
<p><img src={certificate_generation} width="300px"></img></p>
<p>
<Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="Normal"
                  onClick={()=>{history.push("/Requests")}}

                >Request Certificate</Button>
                
   </p>              
</div>
<div className="grid-item ">
<img src={certifcate_request} width="200px"></img>
<p>
<Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="Org"
                  onClick={()=>{history.push("/generate-certificate")}}
                >Generate Certificate</Button>

</p>
</div>
  
                 
                 
                
         

                <div className="requests verify-class" >
        <Typography component="h2" class="Requests-div" >
                Requests
              </Typography>
              {this.state.requests.length===0?(
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
                 top: "12%",
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
              ):(
                <div style={{
                  display:"flex",
                  flexDirection:"row",
                  flexFlow:"row wrap",
                  backgroundColor:"#4d76af",
                  margin:"10px 10px 10px",
                  borderRadius:"20px",
                  width:"90%",
                  position:"relative",
                  top:"12%",
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
              style={{position:"relative",top:"10%",left:"5%",marginBottom:"30px"}}
              className={"b"+index}
              onClick={()=>{
                if(this.state.requests[index].Status==="approved")
                {
                  this.setState({approved:true,display:"0"})
                }
                else
                {
                    this.setState({approved:false,display:"1"})
              }
              this.setState({added:[],nav:true,reqid:index,orgname:this.state.requests[index].OrgName,status:this.state.requests[index].Status,message:this.state.requests[index].Message});console.log(this.state.requests[this.state.reqid].OrgName)}}
              variant="outlined"
              color="primary"
              >
                View</Button>
            </Card>
            </Grid>
          ))}
          </div>
              )}
              
        <div style={{position:"fixed",top:"15%",left:"15%"}}>
        <Fade in={this.state.nav}>
                    <Grid
                        className="entry"
                        container
                        sx={{
                        width: "600vw",
                          height:"500vh",
                       
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
                           height:"500vh",
                            borderRadius: "10rem",
                            boxShadow: "0 10px 20px rgb(30,30,30)",
                            
                          
                            
                        }}
                        >
                        <CardContent className="available-class-pop">
                        <IconButton variant="contained" 
                            color="error"
                            onClick={()=>{this.setState({nav:false})}}
                               sx={{
                                width: "30%",
                                height: "6vh",
                                
                            }}
                            ><CancelPresentationIcon color="error"/></IconButton>
                        <Typography sx={{ fontSize: 40 }} style ={{marginTop:"20px"}} color="text.secondary" gutterBottom >
                       Request ID : {this.state.reqid}
                        </Typography>
                       
                        {/* <div style={{ flex: "1",overflowY:"scroll",height:"20%"}}> */}
                        {/* {EmptyClasses()} */}
                        <div>
                        <p style={{fontSize:"15px",justifyContent:"left"}}>Organization : {this.state.orgname}</p>
                        <p style={{fontSize:"15px",justifyContent:"left"}}>Status : {this.state.status}</p>
                        <p style={{fontSize:"15px",justifyContent:"end"}}>Message : </p>
                       
                        <div ><p style={{margin:"20px 20px 20px",border:"2px solid blue",width:"80%",marginBottom:"3vh"}}>{this.state.message}</p></div>
                        
                        <div className="added Certificates" style={{position:"relative",top:"10%",left:"10%"}}>
                          {
                            this.state.added.map((item,index)=>
                            (
                              <div>
                                <Grid  key={index} style={{position:"relative",top:"10%",left:"10%"}} container >
                                <Grid item>
                                    <Typography >{item.orgname+"-"+item.title}</Typography>
                                </Grid>
                                <Grid item>
                                <Button  onClick={this.handleRemove(index)}>X</Button>
                                </Grid>
                            </Grid>
                              
                              </div>
                            ))
                          }
                        </div>
                        <div className="ChooseCertificates" style={{position:"relative",top:"20%",left:"10%",marginTop:"2vh",opacity:this.state.display}} >
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
                        
                       
                      </TextField>
                      <Button
                      color="primary"
                      variant="contained"
                      style={{height:"7vh",position:"relative",top:"40%",left:"10%"}}
                      onClick={this.handleAdd}
                      >
                        Add +
                      </Button>
                        </div>
                        {this.state.approved===true?(<VerifyBadge />):(                       
                           <Button 
                      color="primary"
                      variant="contained"
                      style={{
                        position:"relative",
                        top:"220%",
                        left:"35%"
                      }}
                      onClick={this.handleSubmit}>
                        Approve
                        </Button>
                        )
                        }
                        </div>
                        {/* </div> */}
                           
                        </CardContent>
                        </Card>
                    </Grid>
                    </Fade>
                    
        </div>
        </div>
        </div>
            </div>

        )
    }
}

export default OrgHome;