const app = require("express")(),
      http = require('http').Server(app),
      io = require('socket.io')(http),
      users = [],
      rooms = [];

io.on('connection', function(socket) {

   // Authentication
   socket.on('setUsername', function(username) {
      if(!username.trim()) socket.emit("failedLogin", "An username is required");
      else if(users.includes(username)) socket.emit("failedLogin", "Username is taken! Try some other username.");
      else {
         users.push(username);
         socket.emit('userSet', {username, rooms});
      }
   });

   // Rooms
   socket.on("createRoom", room => {
      // room must contain: unique name, max capacity(up to 200)
      // optionally can contain: private password, image
      if(!room.name || !room.capacity) socket.emit("failedRoomAttemp", "Rooms requires name and capacity");
      else if(rooms.find(existingRoom => existingRoom.name === room.name)) socket.emit("failedRoomAttemp", "That room already exists");
      else if(room.capacity < 2 || room.capacity > 200) socket.emit("failedRoomAttemp", "The room's capacity must be between 2 and 200");
      else {
         socket.join(room.name);
         room.participants = 1;
         rooms.push(room);
         socket.emit("joinedRoom", room.name);
         io.emit("roomCreated", room);
      }
   });

   socket.on("joinRoom", (roomName, username, roomPassword) => {
      let roomToJoin = rooms.find(room => room.name === roomName);
      if(roomToJoin){
         //If the room is private it verifies it's password matches the one received
         if(roomToJoin.isPrivate && roomToJoin.password !== roomPassword) socket.emit("failedRoomAttemp", "Invalid password");
         else if(Number(roomToJoin.participants) === Number(roomToJoin.capacity)) socket.emit("failedRoomAttemp", "Room is full");
         else {
            roomToJoin.participants++;
            socket.join(roomName);
            socket.emit("joinedRoom", roomName);
            io.to(roomName).emit("botMessage", `${username} joined the room`);
            io.emit("roomUpdated", roomName, roomToJoin.participants);
         }
      }
      else socket.emit("failedRoomAttemp", "That room doesn't exist");
   });

   socket.on("leaveRoom", (username, roomName) => {
      let roomToLeave = rooms.find(room => room.name === roomName);
      roomToLeave.participants--;
      socket.leave(roomName);
      io.to(roomName).emit("botMessage", `${username} left the room`);
      io.emit("roomUpdated", roomName, roomToLeave.participants);
   })
   
   // Messages
   socket.on('msg', function({roomName, username, msg}) {
      io.in(roomName).emit('newmsg', msg, username);
   })
});

http.listen(3000, function() {
   console.log('listening on localhost:3000');
});