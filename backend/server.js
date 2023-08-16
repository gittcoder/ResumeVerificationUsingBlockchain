require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const log = require("./utils/log");
const path = require("path");
const cors = require('cors')

if (process.env.NODE_ENV === undefined) process.env.NODE_ENV = "development";
const Certificates = require("./model/Certificates");
const Requests = require("./model/Requests");
const Login = require("./model/Login");
const OrgReg = require("./model/OrgReg");

// parse application/x-www-form-urlencoded
app.use(cors())
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

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});


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
          console.log(data);
          res.json({result:"Success",privilege:"organization",orgname:data["0"]["OrgName"]});
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
    
  }
  else
  {
    res.status(400).send({result:"User Exists!!!"});
  }
})

    
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

      }
      else
      {
        res.status(400).send({status:"User Exists!!!"});
      }
    })
    
    
   
    
      
        
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
  const {Email,Password,ReqTo,Message,OrgName} = req.body;
  OrgReg.find({Email,Password}).then(data=>{
    if(data.length!==0)
    {
     
  const req= new Requests({Email,ReqTo,Message,Shared:"no",Status:"pending",OrgName})
    
    req
      .save().then(res.status(200).json({result:"Success"})).catch(err => {console.log(err);
        res.status(400).send(err)});

  }
  else
  {
    res.status(400).send({status:"User Exists!!!"});
  }
})

})

app.post("/ApproveRequest",(req,res)=>{
  const {Email,Password,Shared,id} = req.body;
  Login.find({Email,Password}).then(data=>{
    if(data.length!==0)
    {
     
      Requests.findOneAndUpdate({_id:id},{Shared: Shared,Status:"approved"}).then((data)=>
      {
        console.log(data)
        res.send({result:"Success"})
      })

  }
  else
  {
    res.status(400).send({status:"User Exists!!!"});
  }
})

})

app.post("/ViewRequests", (req, res) => {
  const { email, pass } = req.body;
 
  console.log(req.body);
  OrgReg.find({emailId:email,Password:pass}).then(data=>{
  if(data.length!==0)
  {
    let r=[]
    console.log("Success!!!");
    
      Requests.find({Email:email}).then(entries2=>{
        // console.log(JSON.stringify(entries2[0]));
        entries2.forEach(data=>{
          console.log(data)
          r.push({_id:data._id,Email:data.Email,ReqTo:data.ReqTo,Message:data.Message,Shared:data.Shared,Status:data.Status,OrgName:data.OrgName})
        })
       res.send([JSON.stringify(r)])
      })
      
   
  }
  else
  {
    res.status(400).send({status:"User Exists!!!"});
  }
})


  
    
    });


    app.post("/certificateList", (req, res) => {
      const { email, pass } = req.body;
     
      console.log(req.body);
      Login.find({emailId:email,Password:pass}).then(data=>{
      if(data.length!==0)
      {
        let r=[]
        console.log("Success!!!");
        Certificates.find({emailId:email}).then(entries=>{
          Requests.find({ReqTo:email}).then(entries2=>{
            console.log(JSON.stringify(entries));
            entries2.forEach(data=>{
              r.push({_id:data._id,Email:data.Email,ReqTo:data.ReqTo,Message:data.Message,Shared:data.Shared,Status:data.Status,OrgName:data.OrgName})
            })
           res.send([JSON.stringify(entries),JSON.stringify(r)])
          })
          
        })
        
         
    
      }
      else
      {
        res.status(400).send({status:"User Exists!!!"});
      }
    })

      
        
        });

module.exports = { app };
