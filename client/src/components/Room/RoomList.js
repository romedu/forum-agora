import React from "react";
import RoomThumbnail from "./RoomThumbnail";

const RoomList = ({rooms, user}) => {
   const roomThumbnails = rooms.map((room, index) => <RoomThumbnail key={`room${index}`} name={room.name} user={user} isPrivate={room.isPrivate}/>);
   
   return (
      <ul>
         {roomThumbnails}
      </ul>
   )
}

export default RoomList;
