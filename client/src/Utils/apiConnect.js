import { withRouter } from 'react-router-dom'
import React from "react";
import history from './history'
import { useCookies } from 'react-cookie'





const getHeader = {
  headers: {
    Accept: "application/json"
  }
};

const postHeader = {
  method: "POST",
  headers: {
    ...getHeader,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"

  }
};

let host = "";

host = "https://master.d1z312s03luts7.amplifyapp.com";

export const getCertificate = certificateId =>
  fetch(`${host}/certificate/data/${certificateId}`, getHeader)
    .then(res => res.json())
    .catch(err => {
      console.log(err);
    });

export const verifyCertificate = certificateId =>
  fetch(`${host}/certificate/verify/${certificateId}`, getHeader)
    .then(res => {
      if (res.status === 200) return true;
      else if (res.status === 401) return false;
    })
    .catch(err => {
      console.log(err);
    });

export const generateCertificate = (
  candidateName,
  courseName,
  orgName,
  assignDate,
  duration,
  emailId
) =>
// console.log("Hello");
  fetch(`${host}/certificate/generate`, {
    ...postHeader,
    body: JSON.stringify({
      candidateName,
      courseName,
      orgName,
      assignDate,
      duration,
      emailId
    })
  })
    .then(res => res.json())
    .catch(err => {
      console.log(err);
    });


    export const SignUp =(username,pass,firstname,
      lastname,
      email,
      phone,
      gender
      ) =>
    {
      fetch(`${host}/signup`, {
        ...postHeader,
        body: JSON.stringify({
          username,
          pass,
          firstname,
          lastname,
          email,
          phone,
          gender,
          
        })
      })
      .then(async res =>{ if(res.status===200)
        {
          await res.json().then(
            (body)=>{
              console.log(body.result);
              if(body.result=="Success")
              {
                localStorage.setItem('user',email)
                localStorage.setItem('pwd',pass)
                localStorage.setItem("privilege",body.privilege)
                history.push("/dashboard");
              }
            }
          )
        }})
        .catch(err => {
          console.log(err);
        });
    }

    export const OrgReg =(orgname,
      orgregno,
      email,
      phone,
      pass
      ) =>
    {
      fetch(`${host}/OrgReg`, {
        ...postHeader,
        body: JSON.stringify({
          orgname,
      orgregno,
      email,
      phone,
      pass,
          
        })
      })
       .then(async res =>{ if(res.status===200)
        {
          await res.json().then(
            (body)=>{
              console.log(body.result);
              if(body.result=="Success")
              {
                localStorage.setItem('user',email)
                localStorage.setItem('pwd',pass)
                localStorage.setItem('orgname',orgname)
                localStorage.setItem("privilege",body.privilege)
                history.push("/OrgHome");
              }
            }
          )
        }})
        .catch(err => {
          console.log(err);
        });
    }

   export const login =(UserName,Password) =>
    {
      fetch(`${host}/login`, {
        ...postHeader,
        body: JSON.stringify({
          email:UserName,
          pass:Password
        })
      })
      .then(async res =>{ if(res.status===200)
        {
          await res.json().then(
            (body)=>{
              console.log(body.result);
              if(body.result=="Success")
              {
                localStorage.setItem('user',UserName)
                localStorage.setItem('pwd',Password)
                localStorage.setItem("privilege",body.privilege)
                
              
                if(body.privilege==="normal")history.push("/dashboard");
                else{localStorage.setItem("orgname",body.orgname);history.push("/OrgHome")}
              }
            }
          )
        }})
        .catch(err => {
          console.log(err);
        });
    }

    
// login.propTypes = {
//   history: React.PropTypes.shape({
//     push: React.PropTypes.func.isRequired,
//   }),
// };


export const RequestCertificates =(UserName,Password,ReqTo,Message,OrgName
  ) =>
{

  fetch(`${host}/RequestCertificate`, {
    ...postHeader,
    body: JSON.stringify({
      Email:UserName,
      Password,
      ReqTo,
      Message,
      OrgName
      
    })
  })
  .then(async res =>{ if(res.status===200)
    {
      await res.json().then(
        (body)=>{
          console.log(body.result);
          if(body.result=="Success")
          {
            history.push("/OrgHome")
          }
        }
      )
    }})
    .catch(err => {
      console.log(err);
    });
}

export const ApproveRequests =(UserName,Password,Shared,id
  ) =>
{

  fetch(`${host}/ApproveRequest`, {
    ...postHeader,
    body: JSON.stringify({
      Email:UserName,
      Password,
      Shared,
      id
      
    })
  })
  .then(async res =>{ if(res.status===200)
    {
      await res.json().then(
        (body)=>{
          console.log(body.result);
          if(body.result=="Success")
          {
            history.push("/dashboard");
          }
        }
      )
    }})
    .catch(err => {
      console.log(err);
    });
}

export const OrgViewRequests =(UserName,Password,Shared,id
  ) =>
{

  fetch(`${host}/ApproveRequest`, {
    ...postHeader,
    body: JSON.stringify({
      Email:UserName,
      Password,
      Shared,
      id
      
    })
  })
  .then(async res =>{ if(res.status===200)
    {
      await res.json().then(
        (body)=>{
          console.log(body.result);
          if(body.result=="Success")
          {
            history.push("/dashboard");
          }
        }
      )
    }})
    .catch(err => {
      console.log(err);
    });
}