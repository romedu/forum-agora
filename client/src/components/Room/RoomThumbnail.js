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

      socket.emit("newBotMessage", name, `${user} joined the room`);
      socket.emit("joinRoom", name, user, password)
   }

   render(){
      const {password} = this.state,
            {name, isPrivate} = this.props,
            temporaryStyles = {
               width: "21vw",
               height: "21vw",
               margin: "5vh 2vw",
               backgroundColor: "pink"
            };

      return (
         <li style={{width: "fit-content"}} onClick={this.joinRoom}>
            <div style={temporaryStyles}>
               {name}
            </div>
            {isPrivate && <input type="password" value={password} onChange={this.updateInputHandler} />}
         </li>
      )
   }
}

export default RoomThumbnail;