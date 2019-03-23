import React, {Component} from "react";
import Message from "./Message";
import socket from "../../socket";

class MessagesList extends Component {
    state = {
      messages: []
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
       const {user} = this.props,
             {messages} = this.state,
             messagesItems = messages.map(({username, message}, index) => {
                return <Message sender={username} color={user === username ? "info" : "danger"} 
                                message={message} key={`message${index}`} bot={!username} />;
             });
       
       return (
           <div className="MessagesList">
              {messagesItems}
           </div>
       )
   }
}

export default MessagesList;