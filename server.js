"use strict";
const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client/build")));
app.use(cors());

// test route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// api routes

// handle db connection to mongodb

// middlewares

// routes middleware

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 5000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});