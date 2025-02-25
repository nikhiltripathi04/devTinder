const express = require('express');


const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

//handle auth middleware for all requests
app.use("/admin", adminAuth);
app.use("/user", userAuth, (req, res) => {
  res.send("user data sent");
});


app.get("/admin/getAllData", (req, res) => {
  //logic of checking if the request is authorized
  //if not - send error
  // const token = "xy1z";
  // const isAdminAuthorized  = token === "xyz";
  // if (isAdminAuthorized) {
  //   res.send("all data sent");
  // }
  // else {
  //   res.status(401).send("Unauthorized request");
  // }
  res.send("all data sent");
});
app.get("/admin/deleteUser", (req, res) => {
  // logic of checking if the request is authorized
  // if not - send error
  // const token = "xy1z";
  // const isAdminAuthorized  = token === "xyz";
  // if (isAdminAuthorized) {
  //   res.send("deleted user");
  // }
  // else {
  //   res.status(401).send("Unauthorized request");
  // }
  res.send("deleted a user");
});





app.listen(7777, () => {
  console.log("server is successfully listening on port 7777.");
});