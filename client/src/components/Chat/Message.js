import React from "react";
import {Alert} from "reactstrap";

const Message = ({sender, message, color, bot}) => {
    return <Alert color={bot ? "dark" : color}> {sender && `${sender}:`} {message} </Alert>;
}
export default Message;