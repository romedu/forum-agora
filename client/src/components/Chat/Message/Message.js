import React from "react";
import {Alert} from "reactstrap";
import "./Message.css";

const Message = ({sender, message, color, bot, showingParticipants}) => {
    return <Alert className={`Message ${bot ? "BotMessage" : "UserMessage"}`} color={bot ? "dark" : color}  
                  style={{marginLeft: color === "info" && (showingParticipants ? "calc(30vw - 17px)" : "calc(50vw - 17px)")}}> 
               {sender && `${sender}:`} {message} 
            </Alert>;
}
export default Message;