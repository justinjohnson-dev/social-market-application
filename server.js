﻿const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require("passport");
const socketio = require('socket.io');
const cors = require('cors');
const path = require("path");
const http = require("http");
require("dotenv").config();
const app = express();

//functions for sockets
const { addUser, removeUser, getUsersInRoom} = require('./chatUsers.js');

//uses http for socket.io
const server =  http.createServer(app);

//socket.io listening to server 
const io = socketio.listen(server);

app.use(express.json());
app.use(cors());

// import db config
const config = require('./config/config');

// import Model
const Chat = require("./models/chat");
const ChatRoom = require("./models/chatRoom");

// handles cores issues from different domains
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// db conn
const server_uri = config.db;
// port config
const PORT = config.port;
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || server_uri, connectionOptions);

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected to atlas instance!');
});

//searches array to check is user is in room and returns boolean value
const findName = (arr, name) =>{
  return arr.find(res=>res.name===name);
}

//server handling for socket.io
io.on('connect', function(socket){
  
  //on join
  socket.on('join', ({ name, room }, callback) => {
    console.log("A user just joined "+socket.id);
    
    //add user to room
    const { error, user } = addUser({ id: socket.id, name, room });
    ChatRoom.find({room}).then(rooms => {
    
    //room found
    if(rooms.length > 0) {
      
      //response is room found
      const roomRes = rooms[0];

      //set the room id to global variable
      global.roomId = roomRes._id;

      //check to see if name already exists in room so chat history is not sent each time a user connects
      const userName = findName(roomRes.users, name);
        
      //Update the room users
      if(!userName){
        ChatRoom.findByIdAndUpdate(roomRes._id, {$push: {users: {name}}}).then(()=>console.log("DONE UPDATING")).catch(e=>console.log(e))
        }
      }  
    })
    
    //join room
    socket.join(room);

    //error
    if (error) return callback(error);

    //admin message to user
    socket.emit('message', { user: 'admin', text: `${user.name}, thanks for stopping by chatroom: ${user.room}.` });

    //admin message to all users saying a user has joined
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
    callback();

  });

  //on send
  socket.on('sendMessage', (chat, callback) => {
   
    //new chat model
    let newChat = new Chat(chat);

      //save document
      newChat.save((err, success) => {

        //error
        if(err) {
          callback(err)    
        }

        //find chatroom
        ChatRoom.findById(chat.room).then(chatRoomRes=>{

        //emit message to room
        io.to(chatRoomRes.room).emit('message', { name: chat.senderName, text: chat.message });

      })   
    });
  }); 

  //on disconnect from socket
  socket.on('disconnect', () => {

    //room id null
    global.roomId = null;
    const user = removeUser(socket.id);  

    //user matches 
    if (user) {

      //tell users who left
      io.to(user.room).emit('message', {  text: `${user.name} has left the room.` });
      //broadcast to all
      io.to(user.room).emit('roomUsers', { room: user.room, users: getUsersInRoom(user.room) });
      
    }

    //close socket on disconnect
    io.on('disconnect', () => {
      socket.close();
    });

  });
});

// import routes
const userRoutes = require('./routes/api/user');
const postRoutes = require('./routes/api/post');
const orderRoutes = require('./routes/api/order');
const orderResponseRoutes = require('./routes/api/orderResponse');
const chatRoomRoutes = require('./routes/api/chatRoom');
const chatRoutes = require('./routes/api/chat');


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
app.use("/api/orders", orderRoutes, orderResponseRoutes);
app.use("/api/chatRoom", chatRoomRoutes);
app.use("/api/chat", chatRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'local') {
  console.log('local');
} else {
  // Set static folder
  app.use(express.static('client/build'));
  // app.use('/static', express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 5000;
server.listen(port, function () {
  console.log('Server listening on port ' + port);
});
