const express = require('express');
const connectDB = require("./config/database");
const User = require("./models/user");
//require("./config/database"); //connecting the cluster

const app = express();

app.post("/signup", async(req, res) => {
  //creating a new instance of the user model
  const user = new User({
    firstName: "nikhil",
    lastName: "tripathi",
    emailID: "abc@gmail.com",
    password: "abc123"
  });


  try {
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("error saving the user: " + err.message);
  }
});











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


