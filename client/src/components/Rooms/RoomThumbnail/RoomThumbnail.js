import React, {Component} from "react";
import {Card, CardImg, CardTitle, CardBody, CardText, Button} from "reactstrap";
import socket from "../../../socket";
import "./RoomThumbnail.css";

class RoomThumbnail extends Component {
   state = {
      password: ""
   }

   updateInputHandler = ({target}) => this.setState({password: target.value});

   joinRoom = () => {
      const {password} = this.state,
            {name, user} = this.props;

      socket.emit("joinRoom", name, user, password)
   }

   render(){
      const {password} = this.state,
            {name, isPrivate, capacity, participants} = this.props;

      return (
         <Card outline color="success" className="RoomThumbnail" style={{backgroundColor: "inherit"}}>
            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="" />
            <CardBody>
               <CardTitle style={{fontWeight: "bold"}}>
                  {name}
               </CardTitle>
               <CardText>
                  Description
               </CardText>
               <CardText>
                  {participants.length}/{capacity}
               </CardText>
               <Button color="primary" onClick={this.joinRoom}>
                  Join Room
               </Button>
            </CardBody>
            {isPrivate && <input type="password" value={password} onChange={this.updateInputHandler} />}
         </Card>
      )
   }
}

export default RoomThumbnail;