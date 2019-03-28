import React, {Component} from "react";
import {Button} from "reactstrap";
import MessagesList from "../MessagesList";
import MessageForm from "../MessageForm";
import ParticipantsList from "../ParticipantsList/ParticipantsList";
import Hamburger from "../../UI/Hamburger/Hamburger";
import "./ChatRoom.css";

class ChatRoom extends Component {
   state = {
      showParticipants: false
   }
   
   participantsToggler = () => this.setState(prevState => ({showParticipants: !prevState.showParticipants}));

   render(){
      const {room, user, participants, leaveRoom} = this.props,
            {showParticipants} = this.state,
            {availWidth} = window.screen;

      return(
         <div className="ChatRoom">
            <main style={{width: showParticipants && availWidth > 810 ? "80vw" : "100vw"}}>
               <Hamburger toggleHandler={this.participantsToggler} />
               <h2>
                  Room: {room}
               </h2>
               <Button color="danger" style={{position: "fixed", top: "1.5vh", left: "calc(2vh + 17px)", zIndex: "10"}} onClick={leaveRoom}>
                  Leave Room
               </Button>
               <Button color="info" style={{position: "fixed", top: "1.5vh", right: "calc(2vh + 17px)", zIndex: "10"}} onClick={this.participantsToggler}>
                  Participants
               </Button>
               <MessageForm room={room} user={user} showingParticipants={showParticipants} />
               <MessagesList user={user} showingParticipants={showParticipants} />
            </main>
            {showParticipants && participants && <ParticipantsList participants={participants} />}
         </div>
      )
   }
}

export default ChatRoom;