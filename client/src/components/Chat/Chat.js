import React, {Component} from "react";
import Message from "./Message";
import BasicForm from "../UI/BasicForm";
import socket from "../../socket";

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
      const {room, leaveRoom} = this.props,
            {messages, newMessage} = this.state,
            messagesList = messages.map(({username, message}, index) => <Message sender={username} message={message} key={`message${index}`} />);

      return(
         <div>
            <h2>
               Chat
            </h2>
            <h3>
               Room: {room}
            </h3>
            <button style={{color: "red", position: "fixed", top: "10vh", right: "10vh"}} onClick={leaveRoom}>
               Leave Room
            </button>
            <div>
               <BasicForm updateInputHandler={this.updateInputHandler} submitFormHandler={this.submitFormHandler} value={newMessage} />
            </div>
            <ul>
               {messagesList}
            </ul>
         </div>
      )
   }
}

export default Chat;