﻿const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require("path");
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// import db config
const config = require('./config/config');

// set static folder
app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// handles cores issues from different domains
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// db conn
const uri = process.env.MONGODB_URI;
const server_uri = config.db;
if (uri === null) {
  console.log('mongo connecting on web server');
  connect(server_uri);
} else {
  console.log('connected to local atlas cluster!')
  connect(uri);
}

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected to atlas instance!');
});

// import routes
const userRoutes = require('./routes/user');

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// routes middleware
app.use("/api", userRoutes);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 5000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

function connect(current_env) {
  mongoose.connect(current_env, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  });
}