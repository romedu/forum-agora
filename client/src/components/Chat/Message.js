import React from "react";
import {Alert} from "reactstrap";
import "./Message.css";

const Message = ({sender, message, color, bot}) => {
    return <Alert className={bot ? "BotMessage" : "UserMessage"} style={{marginLeft: color === "info" && "30vw"}} color={bot ? "dark" : color}> 
               {sender && `${sender}:`} {message} 
            </Alert>;
}
export default Message;