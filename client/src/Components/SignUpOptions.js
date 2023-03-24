import React,{Component} from "react";
import history from "../Utils/history";
import Button from "@material-ui/core/Button";

const styles = theme => ({
   
    submitBtn: {
      marginLeft: "50px"
    }
  });

class SignUpOptions extends Component
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
                  onClick={()=>{history.push("/SignUp")}}

                  style={{position:"absolute",top:"20%",left:"10%",width:"33%"}}
                >For Normal Users</Button>
                 <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="Org"
                  onClick={()=>{history.push("/OrgReg")}}
                  style={{position:"absolute",top:"30%",left:"10%",width:"33%"}}
                >For Organizations</Button>
                </div>
            </div>

        )
    }
}

export default SignUpOptions;