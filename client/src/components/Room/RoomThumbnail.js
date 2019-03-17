import React, {Component} from "react";
import socket from "../../socket";

class RoomThumbnail extends Component {
   state = {
      password: ""
   }

   updateInputHandler = ({target}) => this.setState({password: target.value});

   render(){
      const {password} = this.state,
            {name, user, isPrivate} = this.props,
            temporaryStyles = {
               width: "21vw",
               height: "21vw",
               margin: "5vh 2vw",
               backgroundColor: "pink"
            };

      return (
         <li style={{width: "fit-content"}} onClick={() => socket.emit("joinRoom", name, user, password)}>
            <div style={temporaryStyles}>
               {name}
            </div>
            {isPrivate && <input type="password" value={password} onChange={this.updateInputHandler} />}
         </li>
      )
   }
}

export default RoomThumbnail;