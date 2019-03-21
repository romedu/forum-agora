import React, {Component} from "react";
import socket from "../../socket";

class RoomThumbnail extends Component {
   state = {
      password: ""
   }

   updateInputHandler = ({target}) => this.setState({password: target.value});

   joinRoom = () => {
      const {password} = this.state,
            {name, user} = this.props;

      socket.emit("joinRoom", name, user, password)
   }

   render(){
      const {password} = this.state,
            {name, isPrivate, capacity, participants} = this.props,
            temporaryStyles = {
               width: "21vw",
               height: "21vw",
               margin: "5vh 2vw",
               backgroundColor: "pink"
            };

      return (
         <li style={{width: "fit-content"}}>
            <div style={temporaryStyles} onClick={this.joinRoom}>
               {name} {participants.length}/{capacity}
            </div>
            {isPrivate && <input type="password" value={password} onChange={this.updateInputHandler} />}
         </li>
      )
   }
}

export default RoomThumbnail;