const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50
  },
  lastName: {
    type: String
  },
  emailID: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error("invalid email address:" +value);
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if(!validator.isStrongPassword(value)) {
        throw new Error("weak password. enter strong password.")
      }
    }
  },
  age: {
    type: Number, 
    required: true,
    min: 18,
  },
  gender: {
    type: String,
    required: true,
    validate(value) {
      if(!["male","female","others"].includes(value)) {
        throw new Error("gender data is not valid");
      }
    }
  },
  skills: {
    type: [String],

  },
  photoUrl: {
    type: String,
    default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw0H-LbcZqli11WYPj172k8m&ust=1741936479972000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOjR6J7BhowDFQAAAAAdAAAAABAE"
  },
  about: {
    type: String,
    default: "this is default about section"
  }
},
{
  timestamps: true,
});

userSchema.methods.getJWT = async function() {
  const user = this;

  const token = await jwt.sign({_id: user._id}, "dev@tinder&70", { expiresIn: "7d"});

  return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
  return isPasswordValid;
}
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;