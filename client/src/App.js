import React, { Component } from 'react';
import {BrowserRouter} from "react-router-dom";
import Login from "./components/Auth/Login";
import Room from "./components/Room/Room";
import ChatRoom from "./components/Chat/ChatRoom";
import socket from "./socket";
import './App.css';

class App extends Component {
   state = {
      user: {
         username: null,
         room: null
      },
      rooms: []
   }

   onUserLogin = ({username, rooms}) => {
      this.setState(prevState => ({
         user: {
            ...prevState.user,
            username
         },
         rooms
      }));
   }

   addRoom = room => this.setState(prevState => ({rooms: prevState.rooms.concat(room)}));

   enterRoom = roomName => this.setState(prevState => ({user: {...prevState.user, room: roomName}}));

   updateRoom = (roomName, roomParticipants) => {
      // Delete the room if it is empty
      if(roomParticipants.length === 0) this.setState(prevState => ({rooms: prevState.rooms.filter(room => room.name !== roomName)}));
      else {
         this.setState(prevState => ({
            // Updates the participants of the updated room
            rooms: prevState.rooms.map(room => room.name !== roomName ? room : {...room, participants: roomParticipants})
         }));
      }
   };

   leaveRoom = () => {
      const {username, room} = this.state.user;
      socket.emit("leaveRoom", username, room);
      this.setState(prevState => ({
         user: {
            ...prevState.user, 
            room: null
         }
      }));
   }

   componentDidMount(){
      socket.on("userSet", this.onUserLogin);
      socket.on("roomCreated", this.addRoom);
      socket.on("joinedRoom", this.enterRoom);
      socket.on("roomUpdated", this.updateRoom);
   }

   render() {
      const {user, rooms} = this.state,
            {username, room} = user,
            currentRoom = room && rooms.find(roomInList => roomInList.name === room);

      return (
         <BrowserRouter>
            <div className="App">
               {!username && <Login/>}
               {username && !room && <Room user={username} rooms={rooms} />}
               {username && room && <ChatRoom user={username} room={room} participants={currentRoom && currentRoom.participants} leaveRoom={this.leaveRoom} />} 
            </div>
         </BrowserRouter>
      );
   }
}

export default App;
