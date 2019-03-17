import React, {Component} from "react";
import RoomList from "./RoomList";
import socket from "../../socket";

class Room extends Component {
   state = {
      newRoom: {
         name: "",
         capacity: 20,
         isPrivate: false,
         password: ""
      },
      errorMessage: null
   }

   updateInputHandler = ({target}) => {
      this.setState(prevState => ({
         newRoom: {
            ...prevState.newRoom,
            [target.name]: target.type === "checkbox" ? !prevState.newRoom.isPrivate : target.value.trim()
         },
         errorMessage: null
      }));
   }

   submitFormHandler = e => {
      e.preventDefault();
      const {newRoom} = this.state;
      socket.emit("createRoom", newRoom);
   }

   setErrorMessage = errorMessage => this.setState({errorMessage});

   componentDidMount(){
      socket.on("failedRoomAttemp", this.setErrorMessage);
   }

   componentWillUnmount(){
      socket.off("failedRoomAttemp");
   }

   render(){
      const {newRoom, errorMessage} = this.state;

      return (
         <div>
            <h2>
               Room
            </h2>
            <form onSubmit={this.submitFormHandler}>
               <input type="text" name="name" value={newRoom.name} onChange={this.updateInputHandler} required />
               <label to="capacity"> Capacity </label>
               <input type="number" name="capacity" value={newRoom.capacity} onChange={this.updateInputHandler} min="3" max="200" required />
               <label to="private"> Private </label>
               <input type="checkbox" name="isPrivate" checked={newRoom.isPrivate} onChange={this.updateInputHandler} />
               {newRoom.isPrivate && <input type="password" name="password" value={newRoom.password} onChange={this.updateInputHandler} required />}
               <button>
                  Submit
               </button>
            </form>
            {errorMessage && <div style={{color: "red"}}> {errorMessage} </div>}
            <RoomList rooms={this.props.rooms} user={this.props.user} />
         </div>
      )
   }
}

export default Room;