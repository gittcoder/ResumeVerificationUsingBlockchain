import React,{Component} from "react";
import history from "../Utils/history";
import Button from "@material-ui/core/Button";
import { Typography,Card,CardContent,Fade,IconButton,MenuItem,TextField } from "@material-ui/core";
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import Grid from "@material-ui/core/Grid";
import { OrgViewRequests } from "../Utils/apiConnect";

import VerifyBadge from "./VerifyBadge";
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
    shared:[],
    approved:false,
    display:"0",

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
              let req = JSON.parse(body["0"])
          
              req.forEach((entries)=>
              {
                  c.push(entries);
              
              })
              this.setState({requests:c})
              console.log("Hello!!!!")
              // console.log(this.state.requests[this.state.reqid].OrgName);
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

            <div>
                <div>
                 <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="Normal"
                  onClick={()=>{history.push("/Requests")}}

                  style={{position:"absolute",top:"20%",left:"10%",width:"33%"}}
                >Request Certificate</Button>
                 <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="Org"
                  onClick={()=>{history.push("/generate-certificate")}}
                  style={{position:"absolute",top:"30%",left:"10%",width:"33%"}}
                >Generate Certificate</Button>
                </div>

                <div className="requests" style={{position:"absolute",top:"43%",left:"6%"}}>
        <Typography component="h1" variant="h3" >
                Requests
              </Typography>
              {this.state.requests.length===0?(
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
                  left:"6%",
                  height:"auto",
                 
  
                }}>
                <Typography style={{margin:"3vh 3vh 3vh",color:"white"}}>No Records Found!!!</Typography>
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
              <Typography style={{fontSize:"15px"}}>Request To : {item.ReqTo }</Typography>
  
              
          
              <Button
              style={{position:"relative",top:"10%",left:"35%",marginBottom:"30px"}}
              className={"b"+index}
              onClick={()=>{
                let s=[]
                let c=[]
                let a=[]
                if(this.state.requests[index].Status==="approved")
                {
                  this.setState({approved:true,display:"0"})
                }
                else
                {
                    this.setState({approved:false,display:"1"})
              }
              
              if(this.state.requests[index].shared!=="no")
              {
                
                  s= this.state.requests[index].Shared.split(",");
                  for(let i=0;i<s.length-1;i++)
                  {
                      a=s[i].split(":")
                      c.push({_id:a[0],title:a[1]})
                  }
              }
              this.setState({shared:c,nav:true,reqid:index,orgname:this.state.requests[index].OrgName,status:this.state.requests[index].Status,message:this.state.requests[index].Message});console.log(this.state.requests[this.state.reqid].OrgName)

            }}
              
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
                        
                        <div className="added Certificates" style={{position:"relative",top:"10%",left:"10%",marginBottom:"4vh"}}>
                          {
                            this.state.shared.map((item,index)=>
                            (
                              <div>
                                <Grid  key={index} style={{position:"relative",top:"10%",left:"10%"}} container >
                                <Grid item>
                                    <Typography variant="h5" style={{marginRight:"3vw",marginBottom:"2vh"}}>{item.title}</Typography>
                                </Grid>
                                <Grid item>
                                <Button  onClick={()=>{history.push("/display/certificate/"+item._id)}} variant = "contained">View</Button>
                                </Grid>
                            </Grid>
                              
                              </div>
                            ))
                          }
                        </div>
                        
                        {this.state.approved===true?(<VerifyBadge />):(                       
                           <Button 
                      
                      variant="contained"
                      style={{
                        position:"relative",
                        top:"220%",
                        left:"35%"
                      }}
              >
                        Pending
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

        )
    }
}

export default OrgHome;