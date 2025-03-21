const express = require('express');
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async(req, res) => {  
 
  try {
    //validation of data
    validateSignUpData(req);
    
    const {firstName, lastName, emailID, password, age, gender, skills, photoUrl, about} = req.body;
    //encrypting the password
    const passwordHash = await bcrypt.hash(password, 10);
    

     //creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailID,
      password: passwordHash,
      age,
      gender,
      skills,
      photoUrl,
      about
    });  

    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/login", async(req, res) => {
  try{
    const {emailID, password} = req.body;

    const user = await User.findOne({emailID: emailID});
    if(!user){
      throw new Error("Wrong Credentials.");
    }

    const isPasswordValid = await user.validatePassword(password);

    if(isPasswordValid) {
      //logic for cookies
      //create a JWT token
      const token = await user.getJWT();   

      //add the token to cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 100000),
      });

      res.send("login successful.");
    } else {
      throw new Error("Wrong Password.");
    }
  }
  catch(err) {
    res.status(400).send("Error: "+ err.message);
  }
});

authRouter.post("/logout", async(req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout successfully.");
});
module.exports = authRouter;