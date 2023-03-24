import React,{Component} from "react";
import history from "../Utils/history";
import Button from "@material-ui/core/Button";

const styles = theme => ({
   
    submitBtn: {
      marginLeft: "50px"
    }
  });

class OrgHome extends Component
{
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
                  onClick={()=>{history.push("//generate-certificate")}}
                  style={{position:"absolute",top:"30%",left:"10%",width:"33%"}}
                >Generate Certificate</Button>
                </div>
            </div>

        )
    }
}

export default OrgHome;