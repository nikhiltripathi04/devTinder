const express = require('express');


const app = express();

//app.use("/route", [rH, rH2, rH3, rH4, rH5]);

app.use("/user", 
  [(req, res, next) =>{
  //route handlers
  console.log("handling the route user 1");
  next();
  //res.send("response 1");
  
  
  },
  (req, res, next) => {
  //route handler
  console.log("handling the route user 2");
  //res.send("2nd response");
  next();
  },
  (req, res, next) => {
    //route handler
    console.log("handling the route user 3");
    //res.send("3rd response");
    next();
  },
  (req, res, next) => {
    //route handler
    console.log("handling the route user 4");
    res.send("4th response");
    next();
  }]
);




app.listen(7777, () => {
  console.log("server is successfully listening on port 7777.");
});