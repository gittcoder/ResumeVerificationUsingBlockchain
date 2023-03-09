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

let host = "";

if (process.env.NODE_ENV !== "production") host = "http://localhost:3000";

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
        .then(res =>{ console.log(res.json())
        
          return ({User:firstname});
        })
        .catch(err => {
          console.log(err);
        });
    }

    export const login =(UserName,Password) =>
    {
      fetch(`${host}/login`, {
        ...postHeader,
        body: JSON.stringify({
          UserName,
          Password
        })
      })
        .then(res => console.log(res.json()))
        .catch(err => {
          console.log(err);
        });
    }