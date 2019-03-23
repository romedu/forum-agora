import React, {Component} from "react";
import {Button} from "reactstrap";
import RoomForm from "../RoomForm/RoomForm";
import RoomList from "../RoomList/RoomList";
import "./Rooms.css";

class Rooms extends Component {
   state = {
      showRoomForm: false
   }

   toggleRoomForm = () => this.setState(prevState => ({showRoomForm: !prevState.showRoomForm}));

   render(){
      const {showRoomForm} = this.state,
            {rooms, user} = this.props;

      return (
         <div className="Rooms">
            <h2>
               Rooms
            </h2>
            <Button color="info" onClick={this.toggleRoomForm}>
               Create a new room
            </Button>
            {showRoomForm && <RoomForm />}
            {rooms && !!rooms.length ? <RoomList rooms={rooms} user={user} /> : <h3 style={{marginTop: "15vh"}}> No rooms to display </h3>}
         </div>
      )
   }
}

export default Rooms;