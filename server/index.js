const app = require("express")(),
      http = require('http').Server(app),
      io = require('socket.io')(http);

var users = [],
    rooms = [];

io.on('connection', function(socket) {

   // Authentication
   socket.on('setUsername', username => {
      const trimmedUsername = username.trim();
      // An username must be unique and have between 3 - 15 characters
      if(!trimmedUsername) socket.emit("failedLogin", "An username is required");
      else if (trimmedUsername.length < 3 || trimmedUsername.length > 15) socket.emit("failedLogin", "Your nickname must have between 3-15 characters");
      else if(users.find(user => user.username === trimmedUsername)) socket.emit("failedLogin", "Username is taken! Try some other username.");
      else {
         users.push({username: trimmedUsername, id: socket.id});
         socket.emit('userSet', {username: trimmedUsername, rooms});
      }
   });


   // Rooms
   socket.on("createRoom", room => {
      const trimmedRoomName = room.name.trim();

      // room must contain: unique name and have between 3 - 20 characters, max capacity(up to 200)
      // optionally can contain: private password, image and short description
      if(!trimmedRoomName || !room.capacity) socket.emit("failedRoomAttemp", "Rooms requires a name and a defined capacity");
      else if(trimmedRoomName.length < 3 || trimmedRoomName.length > 20) socket.emit("failedRoomAttemp", "The room's name must have between 3-20 characters");
      else if(rooms.find(existingRoom => existingRoom.name === trimmedRoomName)) socket.emit("failedRoomAttemp", "That room already exists");
      else if(room.capacity < 2 || room.capacity > 200) socket.emit("failedRoomAttemp", "The room's capacity must be between 2 and 200");
      else {
         let currentUser = users.find(user => user.id === socket.id);
         socket.join(trimmedRoomName);
         room.name = trimmedRoomName;
         room.participants = [currentUser];
         rooms.push(room);
         socket.emit("joinedRoom", room.name);
         io.emit("roomCreated", room);
      }
   });

   socket.on("joinRoom", (roomName, username, roomPassword) => {
      let roomToJoin = rooms.find(room => room.name === roomName);
      if(roomToJoin){
         // If the room is private it verifies it's password matches the one received
         if(roomToJoin.isPrivate && roomToJoin.password !== roomPassword) socket.emit("failedRoomAttemp", "Invalid password");
         else if(Number(roomToJoin.participants.length) === Number(roomToJoin.capacity)) socket.emit("failedRoomAttemp", "Room is full");
         else updateRoom("join", roomName, username);
      }
      else socket.emit("failedRoomAttemp", "That room doesn't exist");
   });

   socket.on("leaveRoom", (username, roomName) => {
      updateRoom("leave", roomName, username);
   })
   
   const updateRoom = (action, roomName, userUpdating) => {
      let roomToUpdate = rooms.find(room => room.name === roomName),
          currentUser = users.find(user => user.username === userUpdating);

      if(action === "leave"){
         roomToUpdate.participants = roomToUpdate.participants.filter(participant => participant.id !== currentUser.id);
         // Delete the room if it is empty
         if(roomToUpdate.participants.length === 0) rooms = rooms.filter(room => room.name !== roomName);
         socket.leave(roomName);
         io.to(roomName).emit("botMessage", `${userUpdating} left the room`);
      }
      else {
         roomToUpdate.participants.push(currentUser);
         io.to(roomName).emit("botMessage", `${userUpdating} joined the room`);
         socket.join(roomName);
         socket.emit("joinedRoom", roomName);
      }

      io.emit("roomUpdated", roomName, roomToUpdate.participants);
   }


   // Messages
   socket.on('msg', ({roomName, username, msg}) => {
      const trimmedMessage = msg.trim();
      if(!trimmedMessage) socket.emit("failedMsgAttemp", "Unable to send an empty message");
      else if(trimmedMessage.length > 500) socket.emit("failedMsgAttemp", "Only a maximum of 500 characters are allowed");
      else io.in(roomName).emit('newmsg', msg, username);
   })


   // Disconnection
   socket.on("disconnecting", () => {
      let joinedRooms = Object.keys(socket.rooms).filter(room => room !== socket.id),
          userDisconnecting = users.find(user => user.id === socket.id);

      // If the user is inside of a room, the room's participant number is reduced by 1
      joinedRooms.forEach(joinedRoom => updateRoom("leave", joinedRoom, userDisconnecting.username));

      // Makes the username available
      users = users.filter(user => user.id !== socket.id);
   })
});

http.listen(3000, function() {
   console.log('listening on localhost:3000');
});