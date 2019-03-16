import React from "react";
import socket from "../../socket";

const temporaryStyles = {
   width: "21vw",
   height: "21vw",
   margin: "5vh 2vw",
   backgroundColor: "pink"
};

const RoomThumbnail = ({name, user}) => (
   <li style={temporaryStyles} onClick={() => socket.emit("joinRoom", {name, newChairman: user})}>
      {name}
   </li>
);

export default RoomThumbnail;