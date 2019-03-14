const express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const users = [],
      rooms = [];

io.on('connection', function(socket) {
   socket.on("createRoom", room => {
      socket.join(room.name);
      rooms.push(room);
      io.to(room.name).emit("joinedRoom", room.name, `The room was created`);
      io.emit("roomCreated", room.name);
   });

   socket.on("joinRoom", room => {
      socket.join(room.name);
      io.to(room.name).emit("joinedRoom", room, `${room.newChairman} joined the room`);
   })

   socket.on('setUsername', function(data) {
      if(users.indexOf(data) > -1) {
         socket.emit('userExists', data + ' username is taken! Try some other username.');
      } else {
         users.push(data);
         socket.emit('userSet', {username: data, rooms});
      }
   });
   
   socket.on('msg', function({roomName, username, msg}) {
      io.to(roomName).emit('newmsg', msg, username);
   })

   socket.on("newBotMessage", (roomName, message) => {
      io.to(roomName).emit("botMessage", message);
   })
});

http.listen(3000, function() {
   console.log('listening on localhost:3000');
});