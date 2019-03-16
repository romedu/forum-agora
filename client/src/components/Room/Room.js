import React, {Component} from "react";
import BasicForm from "../UI/BasicForm";
import RoomList from "./RoomList";
import socket from "../../socket";

class Room extends Component {
   state = {
      newRoomName: ""
   }

   updateInputHandler = ({target}) => {
      this.setState({newRoomName: target.value});
   }

   submitFormHandler = e => {
      e.preventDefault();
      const {newRoomName} = this.state;
      socket.emit("createRoom", {name: newRoomName});
   }

   render(){
      const {newRoomName} = this.state;

      return (
         <div>
            <h2>
               Room
            </h2>
            <BasicForm value={newRoomName} updateInputHandler={this.updateInputHandler} submitFormHandler={this.submitFormHandler} />
            <RoomList rooms={this.props.rooms} user={this.props.user} />
         </div>
      )
   }
}

export default Room;