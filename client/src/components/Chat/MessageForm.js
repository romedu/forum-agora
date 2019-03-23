import React, {Component} from "react";
import {Form, Input, InputGroup, InputGroupAddon, Button} from "reactstrap";
import socket from "../../socket";

class MessageForm extends Component {
    state = {
        messageText: ""
    }
    
    updateInputHandler = ({target}) => {
      this.setState({messageText: target.value});
   }

   submitFormHandler = e => {
      e.preventDefault();
      const {messageText} = this.state,
            {room, user} = this.props,
            messageContent = {
               roomName: room,
               username: user,
               msg: messageText
            };

      this.setState({messageText: ""});
      socket.emit("msg", messageContent);
   }
   
   render(){
       const {messageText} = this.state,
             {showingParticipants} = this.props;
       
       return (
            <Form onSubmit={this.submitFormHandler} style={{position: "fixed", bottom: "0px", width: showingParticipants ? "80%" : "100%"}}>
              <InputGroup>
                 <Input type="text" value={messageText} onChange={this.updateInputHandler} autoComplete="off" />
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