const express = require('express');
const profileRouter = express.Router();
const User = require("../src/models/user");
const {userAuth} = require("../src/middlewares/auth");

profileRouter.get("/profile", userAuth, async(req, res) => {
  try {
   
   const user = req.user;
   res.send(user);
 
  } catch(err) {
   res.status(400).send("Error: "+ err.message);
  }
 });

module.exports = profileRouter;