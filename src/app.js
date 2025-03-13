const express = require('express');
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
//require("./config/database"); //connecting the cluster

const app = express();

app.use(express.json()); //-> middleware app.use(express.json())


app.post("/signup", async(req, res) => {  
 
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

app.post("/login", async(req, res) => {
  try{
    const {emailID, password} = req.body;

    const user = await User.findOne({emailID: emailID});
    if(!user){
      throw new Error("Wrong Credentials.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(isPasswordValid) {
      res.send("login successful.");
    } else {
      throw new Error("Wrong Password.");
    }
  }
  catch(err) {
    res.status(400).send("Error: "+ err.message);
  }
})

//get user by ID
app.get("/user", async(req, res) => {
  const Id = req.body._id;
  {
    const user = await User.findById({_id: Id});
    res.send(user);
  }
});

//delete user API
app.delete("/user", async(req, res) => {
  const Id = req.body.firstName;
  try {
    const user = await User.deleteOne({firstName: Id});
    res.send("user deleted successfully");
  } catch(err) {
    res.status(400).send("something went wrong");
  }
});

//update API
app.patch("/user/:userId", async(req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }

    if(data?.skills.length > 10) {
      throw new Error("skills cannot be more than 10");
    }
    const user = await User.findByIdAndUpdate({_id: userId}, data, {
      returnDocument: "after",
      runValidators: true
    });
    res.send("user updated successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//get user by email
app.get("/user", async(req, res) => {
  const userEmail = req.body.emailID;

  try {
    const user = await User.findOne({emailID : userEmail});
    res.send(user);
    // const users = await User.find({emailID: userEmail});
    // if (users.length === 0) {
    //   res.status(404).send("user not found");
    // } else {
    //   res.send(users);
    // }
  } catch (err) {
    res.send("something went wrong");
  }
  
});


//FEED API - GET /feed - get all the users from the database  
app.get("/feed", async(req, res)=> {
  try{
    const users = await User.find({});
      res.send(users);
    
  } catch(err) {
    res.send("something went wrong");
  }
})




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


