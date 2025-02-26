//logic for connecting to database

const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://nikhiltripathi:nikhilt219@namastenode.usobd.mongodb.net/devTinder" //devTinder - naya database bnaega
  );
};

module.exports = connectDB;

