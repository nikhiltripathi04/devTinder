const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  emailID: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String
  },
  age: {
    type: Number, 
    min: 18,
    max: 50
  },
  gender: {
    type: String,
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
    type: String
  },
  about: {
    type: String
  }
},
{
  timestamps: true,
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;