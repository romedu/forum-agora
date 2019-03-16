import React, { Component } from 'react';
import {BrowserRouter} from "react-router-dom";
import Login from "./components/Auth/Login";
import Room from "./components/Room/Room";
import Chat from "./components/Chat/Chat";
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

   joinRoom = room => this.setState(prevState => ({user: {...prevState.user, room}}));

   componentDidMount(){
      socket.on("userSet", this.onUserLogin);
      socket.on("roomCreated", this.addRoom);
      socket.on("joinedRoom", this.joinRoom);
   }

   render() {
      const {username, room} = this.state.user;

      return (
         <BrowserRouter>
            <div className="App">
               {!username && <Login/>}
               {username && !room && <Room user={username} rooms={this.state.rooms} />}
               {username && room && <Chat user={username} room={room} />} 
            </div>
         </BrowserRouter>
      );
   }
}

export default App;
