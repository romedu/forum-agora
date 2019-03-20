import React from "react";
import {Alert} from "reactstrap";

const Message = ({sender, message, color, bot}) => {
    return <Alert style={{marginLeft: color === "info" ? "30vw" : 0}} color={bot ? "dark" : color}> {sender && `${sender}:`} {message} </Alert>;
}
export default Message;