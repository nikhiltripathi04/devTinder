const validator = require("validator");
// const { all } = require("../../routes/auth");

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

const validateEditProfileData = (req) => {
  const allowedEditFields = ["firstName", "lastName", "photoUrl", "age", "gender", "skills", "about"];

  const isEditAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field));

  return isEditAllowed;
};

const validateEditPassword = (req) => {
  const allowedEditFields = ["oldPassword", "newPassword"];
  const requestFields = Object.keys(req.body);
  const isEditAllowed = requestFields.every(field => allowedEditFields.includes(field));

  return isEditAllowed;
}

module.exports = {
  validateSignUpData,
  validateEditProfileData,
  validateEditPassword,
}