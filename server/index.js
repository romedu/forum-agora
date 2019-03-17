const app = require("express")(),
      http = require('http').Server(app),
      io = require('socket.io')(http),
      users = [],
      rooms = [];

io.on('connection', function(socket) {
   socket.on('setUsername', function(data) {
      if(users.indexOf(data) > -1) {
         socket.emit('userExists', data + ' username is taken! Try some other username.');
      } else {
         users.push(data);
         socket.emit('userSet', {username: data, rooms});
      }
   });


   socket.on("createRoom", room => {
      // room must contain: unique name, max capacity(up to 200)
      // optionally can contain: private password, image
      if(!room.name || !room.capacity) io.emit("failedRoomAttemp", "Rooms requires name and capacity");
      else if(rooms.find(existingRoom => existingRoom.name === room.name)) io.emit("failedRoomAttemp", "That room already exists");
      else if(room.capacity < 2 || room.capacity > 200) io.emit("failedRoomAttemp", "The room's capacity must be between 2 and 200");
      else {
         socket.join(room.name);
         rooms.push(room);
         io.to(room.name).emit("joinedRoom", room.name, `The room was created`);
         io.emit("roomCreated", room);
      }
   });

   socket.on("joinRoom", (roomName, username, roomPassword) => {
      let roomToJoin = rooms.find(room => room.name === roomName);
      if(roomToJoin){
         //If the room is private it verifies it's password matches the one received
         if(roomToJoin.isPrivate && roomToJoin.password !== roomPassword) io.emit("failedRoomAttemp", "Invalid password");
         else {
            socket.join(roomName);
            io.to(roomName).emit("joinedRoom", roomName, `${username} joined the room`);
         }
      }
      else io.emit("failedRoomAttemp", "That room doesn't exist");
   });

   socket.on("leaveRoom", roomName => {
      socket.leave(roomName);
      io.emit("leftRoom");
   })
   
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