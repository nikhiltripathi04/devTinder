const express = require('express');


const app = express();

app.get('/user', (req, res) => {
  res.send({firstName: "nikhil", lastName : "tripathi"});
});

app.post('/user', (req, res) => {
  console.log("save data to DB");
  res.send("data saved successfully to the db");
});

app.use("/test",(req, res) => {
  res.send("hello from the server");
});




app.listen(7777, () => {
  console.log("server is successfully listening on port 7777.");
});