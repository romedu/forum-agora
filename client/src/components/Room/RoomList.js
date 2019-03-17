import React from "react";
import RoomThumbnail from "./RoomThumbnail";

const RoomList = ({rooms, user}) => {
   const roomThumbnails = rooms.map((room, index) => <RoomThumbnail key={`room${index}`} user={user} {...room} />);
   
   return (
      <ul>
         {roomThumbnails}
      </ul>
   )
}

export default RoomList;
