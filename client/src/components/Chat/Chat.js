import React, {Component} from "react";
import {Input, InputGroup, InputGroupAddon, Button} from "reactstrap";
import Message from "./Message";
import socket from "../../socket";
import "./Chat.css";

class Chat extends Component {
   state = {
      messages: [],
      newMessage: ""
   }
   
   updateInputHandler = ({target}) => {
      this.setState({newMessage: target.value});
   }

   submitFormHandler = e => {
      e.preventDefault();
      const {newMessage} = this.state,
            {room, user} = this.props,
            messageContent = {
               roomName: room,
               username: user,
               msg: newMessage
            };

      socket.emit("msg", messageContent);
   }

   addMessage = (message, username) => this.setState(prevState => ({
      messages: prevState.messages.concat({message, username}),
      newMessage: ""
   }));

   addBotMessage = message => this.setState(prevState => ({messages: prevState.messages.concat({message})}));

   componentDidMount(){
      socket.on("newmsg", this.addMessage);
      socket.on("botMessage", this.addBotMessage);
   }

   componentWillUnmount(){
      socket.off("newmsg");
      socket.off("botMessage");
   }

   render(){
      const {room, user, participants, leaveRoom} = this.props,
            {messages, newMessage} = this.state,
            messagesList = messages.map(({username, message}, index) => {
               return <Message sender={username} color={user === username ? "info" : "danger"} 
                               message={message} key={`message${index}`} bot={!username} />;
            }),
            participantsList = participants && participants.map((participant, index) => {
               return <li key={`participant${index}`}> {participant.username} </li>
            });

      return(
         <div className="ChatRoom">
            <main>
               <h2>
                  Room: {room}
               </h2>
               <button style={{color: "red", position: "fixed", top: "10vh", right: "10vh"}} onClick={leaveRoom}>
                  Leave Room
               </button>
               <InputGroup style={{position: "fixed", bottom: "0px", width: "80vw"}}>
                  <Input type="text" value={newMessage} onChange={this.updateInputHandler} />
                  <InputGroupAddon addonType="append">
                     <Button onClick={this.submitFormHandler} color="primary">
                        Send Message
                     </Button>
                  </InputGroupAddon>
               </InputGroup>
               <div className="MessagesList">
                  {messagesList}
               </div>
            </main>
            <section>
               <h5>
                  Participants
               </h5>
               <ul>
                  {participantsList}
               </ul>
            </section>
         </div>
      )
   }
}

export default Chat;