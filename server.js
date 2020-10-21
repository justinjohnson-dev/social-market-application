﻿const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require("passport");
const cors = require('cors');
const path = require("path");
const socketio = require('socket.io');
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
const postRoutes = require('./routes/api/post');

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
app.use("/api/posts", postRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'local') {
  console.log('local');
} else {
  // Set static folder
  app.use(express.static('client/public'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
  });
}

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 5000;
const server = app.listen(port, function () {
  console.log('Server listening on port ' + port);
});


//move to different file and export server for io sockets
// const { addUserToChat, removeUserFromChat, getUser, getUsersInRoom } = require('./chatUsers.js');

// const io = socketio(server);

// io.on('connect', (socket) => {

//   socket.on('join', ({ userName, roomName }, callback) => {
//     const { error, user } = addUserToChat({ id: socket.id, userName, roomName });

//     if (error) return callback(error);

//     socket.emit('message', { user: 'admin', text: `${user.userName}, thanks for stopping by chatroom ${user.roomName}.` });
//     socket.broadcast.to.apply(user.roomName).emit('message', { user: 'admin', text: `${user.userName} has joined!` });

//     socket.join(user.roomName);

//     io.to(user.roomName).emit('roomUsers', { room: user.roomName, users: getUsersInRoom(user.roomName) })

//     callback();

//   });

//   socket.on('sendMessage', (message, callback) => {

//     const user = getUser(socket.id);

//     io.to(user.roomName).emit('message', { user: user.userName, text: message });

//     callback();

//   });

//   socket.on('disconnect', () => {

//     const user = removeUserFromChat(socket.id);

//     if (user) {

//       io.to(user.roomName).emit('message', { user: 'admin', text: `${user.userName} has left the room.` });

//       io.to(user.roomName).emit('roomUsers', { room: user.roomName, users: getUsersInRoom(user.roomName) });

//     }
//   });
// });
