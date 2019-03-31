import React from "react";
import RoomThumbnail from "../RoomThumbnail/RoomThumbnail";
import "./RoomList.css";

const RoomList = ({rooms, user}) => {
   const roomThumbnails = rooms.map((room, index) => <RoomThumbnail key={`room${index}`} user={user} {...room} />);
   
   return (
      <div className="RoomList">
         {roomThumbnails}
      </div>
   )
}

export default RoomList;
