﻿const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

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
mongoose.connect("mongodb://localhost/home-grown" || process.env.MONGODB_URI,{
   useUnifiedTopology: true,
   useNewUrlParser: true,
   useCreateIndex: true,
}).then(()=>{console.log("DB is connected")})

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
