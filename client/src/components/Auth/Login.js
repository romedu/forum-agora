import React, {Component} from "react";
import {Jumbotron, Form, Label, Input, Button, Spinner} from "reactstrap";
import socket from "../../socket";
import "./Login.css";

class Login extends Component {
   state = {
      username: "",
      errorMessage: null,
      isLoading: false
   }

   updateInputHandler = ({target}) => {
      const newValue = target.value.trim();

      this.setState(() => {
         if(newValue.length > 15) return ({errorMessage: "Only a maximum of 15 characters are allowed"});
         return ({
            username: newValue,
            errorMessage: null
         });
      });
   }

   submitFormHandler = e => {
      e.preventDefault();
      this.setState({isLoading: true}, () => {
         const {username} = this.state;
         socket.emit("setUsername", username);
      });  
   }

   setErrorMessage = errorMessage => this.setState({errorMessage});

   componentDidMount(){
      socket.on("failedLogin", this.setErrorMessage);
   }

   componentWillUnmount(){
      socket.off("failedLogin");
   }

   render(){
      const {username, errorMessage, isLoading} = this.state;

      return (
         <div className="Login">
            <Jumbotron>
               <h2>
                  Login
               </h2>
               <Form onSubmit={this.submitFormHandler}>
                  <Label for="username">
                     Type in your desired nickname
                  </Label>
                  <Input type="text" id="username" value={username} onChange={this.updateInputHandler} minLength="3" 
                         placeholder="Between 3-15 characters e.g. Alvin" autoComplete="off" required />
                  {errorMessage && <div style={{color: "red"}}>
                     {errorMessage}
                  </div>}
                  <Button color={isLoading ? "secondary" : "success"} disabled={isLoading}>
                     Submit
                  </Button>
               </Form> 
            </Jumbotron>
            {isLoading && <Spinner size="lg" color="success" style={{display: "block", margin: "0 auto"}} />}   
         </div>
      )
   }
}

export default Login;