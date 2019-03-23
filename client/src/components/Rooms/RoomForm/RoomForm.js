import React, {Component} from "react";
import {Jumbotron, Form, FormGroup, Label, Input, Button} from "reactstrap";
import socket from "../../../socket";
import "./RoomForm.css";

class RoomForm extends Component {
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
      console.log("Called", target);
      this.setState(prevState => ({
         newRoom: {
            ...prevState.newRoom,
            [target.id]: target.type === "checkbox" ? !prevState.newRoom.isPrivate : target.value.trim()
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
         <Jumbotron className="RoomForm">
            <h3>
               New Room
            </h3>
            <Form onSubmit={this.submitFormHandler}>
               <FormGroup>
                  <Label for="name">
                     Name
                  </Label>
                  <Input type="text" id="name" placeholder="Your room name" value={newRoom.name} onChange={this.updateInputHandler} autoComplete="off" required />
                  {errorMessage && <div style={{color: "red"}}> {errorMessage} </div>}
               </FormGroup>
               <FormGroup>
                  <Label for="capacity">
                     Capacity
                  </Label>
                  <Input type="number" id="capacity" value={newRoom.capacity} onChange={this.updateInputHandler} min="2" max="200" required />
               </FormGroup>
               <FormGroup>
                  <label for="isPrivate" style={{marginRight: "1vw"}}>
                     Make the room private
                  </label>
                  <input type="checkbox" id="isPrivate" checked={newRoom.isPrivate} onChange={this.updateInputHandler} />
               </FormGroup>
               {newRoom.isPrivate && <FormGroup>
                  <Label for="roomPassword">
                     Room password
                  </Label>
                  <Input type="password" id="roomPassword" value={newRoom.password} onChange={this.updateInputHandler} required />
               </FormGroup>}
               <Button color="success">
                  Create Room
               </Button>
            </Form>
         </Jumbotron>
      )
   }
}

export default RoomForm;