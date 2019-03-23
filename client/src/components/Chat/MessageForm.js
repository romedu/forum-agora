import React, {Component} from "react";
import {Form, Input, InputGroup, InputGroupAddon, Button} from "reactstrap";
import socket from "../../socket";

class MessageForm extends Component {
    state = {
        messageText: ""
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
   
   render(){
       const {newMessage} = this.state;
       
       return (
            <Form onSubmit={this.submitFormHandler} style={{position: "fixed", bottom: "0px", width: "80%"}}>
              <InputGroup>
                 <Input type="text" value={newMessage} onChange={this.updateInputHandler} />
                 <InputGroupAddon addonType="append">
                    <Button color="primary">
                       Send Message
                    </Button>
                 </InputGroupAddon>
              </InputGroup>
           </Form>
        )
   }
}

export default MessageForm;