import React from "react";
import {Button} from "reactstrap";
import "./ParticipantsList.css";

const ParticipantsList = ({participants, leaveRoom}) => {
    const participantItems = participants.map((participant, index) => {
       return <li key={`participant${index}`}> 
                {participant.username} 
              </li>
    });
    
    return (
        <section className="ParticipantsList">
            <Button color="danger" onClick={leaveRoom}>
               Leave Room
            </Button>
            <h5>
              Participants
            </h5>
            <ul>
                {participantItems}
            </ul>
        </section>
    );
}

export default ParticipantsList;