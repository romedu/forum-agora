import React, {Component} from "react";
import {Button} from "reactstrap";
import MessagesList from "./MessagesList";
import MessageForm from "./MessageForm";
import ParticipantsList from "./ParticipantsList";
import "./ChatRoom.css";

class ChatRoom extends Component {
   state = {
      showParticipants: false
   }
   
   participantsToggler = () => this.setState(prevState => ({showParticipants: !prevState.showParticipants}));

   render(){
      const {room, user, participants, leaveRoom} = this.props,
            {showParticipants} = this.state;

      return(
         <div className="ChatRoom">
            <main>
               <h2>
                  Room: {room}
               </h2>
               <Button color="danger" style={{position: "fixed", top: "1.5vh", left: "2vh"}} onClick={leaveRoom}>
                  Leave Room
               </Button>
               <Button color="info" style={{position: "fixed", top: "1.5vh", right: "2vh"}} onClick={this.participantsToggler}>
                  Participants
               </Button>
               <MessageForm room={room} user={user} />
               <MessagesList user={user} />
            </main>
            {showParticipants && participants && <ParticipantsList participants={participants} />}
         </div>
      )
   }
}

export default ChatRoom;