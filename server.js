"use strict";
const express = require("express");
const app = express();

//use port from env in container
const port = process.env.port || 5000;

// test route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// import routes

// handle db connection to mongodb

// middlewares

// routes middleware

app.listen(port, err => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Listening on port ${port}`);
});