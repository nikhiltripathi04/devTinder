const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  //read the token from the req cookies
  try {
    const {token} = req.cookies;
    if(!token) {
      throw new Error("token is not valid");
    }
    const decodedObj = await jwt.verify(token, "dev@tinder&70");

    const {_id} = decodedObj;

    const user = await User.findById(_id);
    if(!user) {
      throw new Error("user not found");
    }
    req.user = user;
    next();
  } catch(err) {
    res.status(400).send("error: " +err.message);
  }






  //validate the token
  //find the user
}

module.exports = {
  userAuth
};