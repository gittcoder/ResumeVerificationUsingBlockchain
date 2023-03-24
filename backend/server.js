require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const log = require("./utils/log");
const path = require("path");

if (process.env.NODE_ENV === undefined) process.env.NODE_ENV = "development";
const Certificates = require("./model/Certificates");
const Requests = require("./model/Requests");
const Login = require("./model/Login");
const OrgReg = require("./model/OrgReg");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// logger
app.use((req, res, next) => {
  const now = new Date().toString().slice(4, 24);
  res.on("finish", () => {
    console.log(`${now} ${req.method} ${res.statusCode} ${req.url}`);
  });
  next();
});

// CORS
if (process.env.NODE_ENV !== "production") app.use(require("cors")());

app.get("/certificate/data/:id", (req, res) => {
  let certificateId = req.params.id;
  console.log(certificateId)
  Certificates.findById(certificateId)
    .then(obj => {
      if (obj === null)
        res.status(400).send({ err: "Certificate data doesn't exist" });
      else res.send(obj);
    })
    .catch(err => res.status(400).send({ err }));
});

app.get("/certificate/verify/:id", (req, res) => {
  let certificateId = req.params.id;
  console.log(certificateId);
  Certificates.findById(certificateId)
    .then(obj => {
      obj.verifyData().then(verified => {
        if (verified) res.status(200).send({message:"letsgoo"});
        else res.status(401).send();
      });
    })
    .catch(err =>
      res.status(400).send({ err: "No data found for the given certificateId" })
    );
});

app.post("/login", (req, res) => {
  const { email,pass } = req.body
  console.log(req.body);
  // console.log(certificateId);
  Login.find({Email:email,Password:pass}).then(data=>{
    if(data.length===0)
    {
      OrgReg.find({Email:email,Password:pass}).then(data=>{
        if(data.length===0)
        {
          res.status(400).send({result:"Invalid Credentials!!!"});
        }
        else
        {
          res.json({result:"Success",privilege:"organization"});
        }})

    }
    else
    {
      res.json({result:"Success",privilege:"normal"});
    }
  })
    .catch(err =>
      res.status(400).send({ err: "No data found for the given certificateId" })
    );
    
    
});


app.post("/signup", (req, res) => {
  const { username, pass, firstname, lastname, email, phone, gender } = req.body;
  console.log(req.body);
  Login.find({ $or: [ {  Phone: phone }, { UserName: username } , {Email:email}] }).then(data=>{
  if(data.length===0)
  {
    console.log("NewUser!!!");
    const login = new Login({
      UserName:username, Password:pass, FirstName:firstname, LastName:lastname, Email:email, Phone:phone, Gender:gender
    });
  
    login
      .save().then(res.status(200).send({result:"Success",privilege:"normal"})).catch(err => {console.log(err);
        res.status(400).send(err)});
    // Login.insertMany([{UserName:user,Password:pass,FirstName:fname,LastName:lname,Email:email,Phone:phone,Gender:gender}]);
  }
  else
  {
    res.status(400).send({result:"User Exists!!!"});
  }
})



  // const given = new Date(assignDate);

  // let expirationDate = given.setFullYear(given.getFullYear() + duration);

  // expirationDate = expirationDate.toString();

  
    
    });


    app.post("/OrgReg", (req, res) => {
      const { orgname,
        orgregno,
        email,
        phone,
        pass,} = req.body;
      console.log(req.body);
      OrgReg.find({ $or: [ {  Phone: phone }, { RegNo:orgregno } , {Email:email}] }).then(data=>{
      if(data.length===0)
      {
        console.log("NewUser!!!");
        const login = new OrgReg({
          OrgName:orgname, RegNo:orgregno, Email:email, Phone:phone, Password:pass
        });
      
        login
          .save().then(res.status(200).send({result:"Success",privilege:"organization"})).catch(err => {console.log(err);
            res.status(400).send(err)});
        // Login.insertMany([{UserName:user,Password:pass,FirstName:fname,LastName:lname,Email:email,Phone:phone,Gender:gender}]);
      }
      else
      {
        res.status(400).send({status:"User Exists!!!"});
      }
    })
    
    
    
      // const given = new Date(assignDate);
    
      // let expirationDate = given.setFullYear(given.getFullYear() + duration);
    
      // expirationDate = expirationDate.toString();
    
      
        
        });
    

app.post("/certificate/generate", (req, res) => {
  const { candidateName, orgName, courseName, assignDate, duration,emailId } = req.body;
  console.log(req.body);
  const given = new Date(assignDate);

  let expirationDate = given.setFullYear(given.getFullYear() + duration);

  expirationDate = expirationDate.toString();

  const certificate = new Certificates({
    candidateName,
    orgName,
    courseName,
    expirationDate,
    assignDate,
    duration,
    emailId
  });

  certificate
    .save()
    .then(obj => {
      const dbRes = obj.toJSON();
      obj
        .appendBlockchain()
        .then(data => {
          const { transactionHash, blockHash } = data.receipt;
          res.status(201).send({
            receipt: {
              transactionHash,
              blockHash
            },
            data: dbRes
          });
        })
        .catch(err => res.status(500).send(err));
    })
    .catch(err => {
      console.log(err);
      res.status(400).send();
    });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(
    `This is a ${
      process.env.NODE_ENV
    } environment.\nServer is up on port ${port}`
  );
});


app.post("/RequestCertificate",(req,res)=>{
  const {Email,Password,ReqTo,Message} = req.body;
  OrgReg.find({Email,Password}).then(data=>{
    if(data.length!==0)
    {
  const Requests= new Requests({Email,ReqTo,Message,Shared:"",Status:"pending"})
    
    Requests
      .save().then(res.status(200).send({result:"Success"})).catch(err => {console.log(err);
        res.status(400).send(err)});
    // Login.insertMany([{UserName:user,Password:pass,FirstName:fname,LastName:lname,Email:email,Phone:phone,Gender:gender}]);
  }
  else
  {
    res.status(400).send({status:"User Exists!!!"});
  }
})

})

app.post("/certificateList", (req, res) => {
  const { email, pass } = req.body;
  console.log(req.body);
  Login.find({emailId:email,Password:pass}).then(data=>{
  if(data.length!==0)
  {
    console.log("Success!!!");
    Certificates.find({emailId:email}).then(entries=>{
   
     res.json(entries);
      
    })
    Requests.find({ReqTo:email}).then(entries=>{
   
      console.log(entries);
       
     })
    // const login = new Login({
    //   UserName:username, Password:pass, FirstName:firstname, LastName:lastname, Email:email, Phone:phone, Gender:gender,emailId
    // });
  
    // login
    //   .save().then(res.status(200).send({result:"Success"})).catch(err => {console.log(err);
    //     res.status(400).send(err)});
    // Login.insertMany([{UserName:user,Password:pass,FirstName:fname,LastName:lname,Email:email,Phone:phone,Gender:gender}]);
  }
  else
  {
    res.status(400).send({status:"User Exists!!!"});
  }
})
  // const given = new Date(assignDate);

  // let expirationDate = given.setFullYear(given.getFullYear() + duration);

  // expirationDate = expirationDate.toString();

  
    
    });

module.exports = { app };
