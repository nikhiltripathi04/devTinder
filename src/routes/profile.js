const express = require('express');
const profileRouter = express.Router();
const User = require("../models/user");
const {userAuth} = require("../middlewares/auth");
const { validateEditProfileData, validateEditPassword } = require('../utils/validation');
const bcrypt = require("bcrypt");
const validator = require("validator");

profileRouter.get("/profile", userAuth, async(req, res) => {
  try {
   
   const user = req.user;
   res.send(user);
 
  } catch(err) {
   res.status(400).send("Error: "+ err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async(req, res) => {
  try {
    if(!validateEditProfileData(req)){
      throw new Error("invalid edit request");
    }

    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.send(`${loggedInUser.firstName}, your profile was updated successfully.`);
  } catch(err) {
    res.status(400).send("error: " +err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async(req, res) => {
  try{
    if (!validateEditPassword) {
      throw new Error("invalid edit request");
    }
    const {oldPassword, newPassword} = req.body;
    const loggedInUser = req.user;

    const isPasswordValid = await bcrypt.compare(oldPassword, loggedInUser.password);
    if(!isPasswordValid) {
      throw new Error("Invalid old password");
    }
    
    if(!validator.isStrongPassword(newPassword)){
      throw new Error("enter strong password");
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    loggedInUser.password = hashedNewPassword;
    await loggedInUser.save();
    res.status(200).send("password updated successfully");   
  }
  catch(err) {
    res.status(400).send("error: " +err.message);
  }
});

module.exports = profileRouter;