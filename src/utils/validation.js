const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, emailID, password, age, gender } = req.body;

  if(!firstName) {
    throw new Error("Name is not valid.");
  } 
  else if(!validator.isEmail(emailID)){
    throw new Error("email is not valid");
  }
  else if(!validator.isStrongPassword(password)){
    throw new Error("please enter a strong password");
  }
};

module.exports = {
  validateSignUpData
}