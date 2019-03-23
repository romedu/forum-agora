import React from "react";

const ParticipantsList = ({participants}) => {
    const participantItems = participants.map((participant, index) => {
       return <li key={`participant${index}`}> 
                {participant.username} 
              </li>
    });
    
    return (
        <section>
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