import React, {Component} from "react";
import {Jumbotron, Form, Label, Input, Button} from "reactstrap";
import socket from "../../socket";
import "./Login.css";

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
         <div className="Login">
            <Jumbotron style={{width: "60vw", margin: "15vh 20vw"}}>
               <h2>
                  Login
               </h2>
               <Form onSubmit={this.submitFormHandler}>
                  <Label for="username">
                     Type in your desired nickname
                  </Label>
                  <Input type="text" id="username" value={username} onChange={this.updateInputHandler} placeholder="Your nickname. e.g. Alphonse" autoComplete="off" required />
                  {errorMessage && <div style={{color: "red"}}>
                     {errorMessage}
                  </div>}
                  <Button color="primary">
                     Submit
                  </Button>
               </Form> 
            </Jumbotron>           
         </div>
      )
   }
}

export default Login;