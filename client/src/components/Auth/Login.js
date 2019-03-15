import React, {Component} from "react";
import BasicForm from "../UI/BasicForm";
import socket from "../../socket";

class Login extends Component {
   state = {
      username: ""
   }

   updateInputHandler = ({target}) => {
      this.setState({username: target.value});
   }

   submitFormHandler = e => {
      e.preventDefault();
      const {username} = this.state;
      socket.emit("setUsername", username);
   }

   render(){
      const {username} = this.state;

      return (
         <div>
            <h2>
               Login
            </h2>
            <BasicForm value={username} updateInputHandler={this.updateInputHandler} submitFormHandler={this.submitFormHandler} />
         </div>
      )
   }
}

export default Login;