import React from "react";

const Message = ({sender, message}) => <li> {sender && `${sender}:`} {message} </li>;

export default Message;