import React, { Component } from 'react';
import {BrowserRouter} from "react-router-dom";
import './App.css';
import Login from "./components/Auth/Login";
import Room from "./components/Room/Room";
import Chat from "./components/Chat/Chat";
import socket from "../../socket";

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

   componentDidMount(){
      socket.on("userExists", this.onUserLogin);
   }

   render() {
      const {username, room} = this.state.user;

      return (
         <BrowserRouter>
            <div className="App">
               {!username && <Login/>}
               {username && !room && <Room />}
               {username && room && <Chat/>} 
            </div>
         </BrowserRouter>
      );
   }
}

export default App;
