const express = require('express');
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser"); //require("./config/database"); //connecting the cluster
const authRouter = require('../src/routes/auth');
const profileRouter = require('../src/routes/profile');
const requestRouter = require('../src/routes/request');
const app = express();

app.use(express.json()); //-> middleware app.use(express.json())
app.use(cookieParser()); // -> helped to read the value of token in the cookie from postman

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);






connectDB()
  .then(()=> {
    console.log("database connection established");
    app.listen(7777, ()=> {
      console.log("server is successfully listening on port 7777.");
    });
  })
  .catch((err) => {
    console.log("database cannot be connected");
  });


