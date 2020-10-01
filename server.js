﻿const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require("passport");
const cors = require('cors');
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// import db config
const config = require('./config/config');

// handles cores issues from different domains
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// db conn
const server_uri = config.db;
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || server_uri, connectionOptions);

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected to atlas instance!');
});

// import routes
const userRoutes = require('./routes/api/user');
// const authRoutes = require('./routes/api/auth');

// middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors());

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// routes middleware
app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'local') {
  console.log('local');
} else {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 5000;
const server = app.listen(port, function () {
  console.log('Server listening on port ' + port);
});
