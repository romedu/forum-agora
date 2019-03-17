import React, {Component} from "react";
import BasicForm from "../UI/BasicForm";
import socket from "../../socket";

class Login extends Component {
   state = {
      username: "",
      errorMessage: null
   }

   updateInputHandler = ({target}) => this.setState({
      username: target.value.trim(),
      errorMessage: null
   });

   submitFormHandler = e => {
      e.preventDefault();
      const {username} = this.state;
      socket.emit("setUsername", username);
   }

   setErrorMessage = errorMessage => this.setState({errorMessage});

   componentDidMount(){
      socket.on("failedLogin", this.setErrorMessage);
   }

   componentWillUnmount(){
      socket.off("failedLogin");
   }

   render(){
      const {username, errorMessage} = this.state;

      return (
         <div>
            <h2>
               Login
            </h2>
            <BasicForm value={username} updateInputHandler={this.updateInputHandler} submitFormHandler={this.submitFormHandler} />
            {errorMessage && <div style={{color: "red"}}> {errorMessage} </div>}
         </div>
      )
   }
}

export default Login;