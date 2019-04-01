import React, {Component, Fragment} from "react";
import {Card, CardImg, CardTitle, CardBody, CardText, Button, Popover, PopoverHeader} from "reactstrap";
import socket from "../../../socket";
import "./RoomThumbnail.css";

class RoomThumbnail extends Component {
   state = {
      password: "",
      errorMessage: null
   }

   updateInputHandler = ({target}) => this.setState({
      password: target.value,
      errorMessage: null
   });

   setErrorMessage = errorMessage => this.setState({errorMessage});

   joinRoom = () => {
      const {password} = this.state,
            {name, user} = this.props;

      socket.emit("joinRoom", name, user, password);
   }

   componentDidMount(){
      socket.on("unauthorized", this.setErrorMessage);
   }

   componentWillUnmount(){
      socket.off("unauthorized");
   }

   render(){
      const {password, errorMessage} = this.state,
            {name, isPrivate, capacity, participants} = this.props,
            roomIsFull = (capacity - participants.length) === 0;

      return (
         <Fragment>
            <Card outline id={name} color={roomIsFull ? "danger" : "success"} className="RoomThumbnail" style={{backgroundColor: "inherit"}}>
               <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="" />
               <CardBody>
                  <CardTitle style={{fontWeight: "bold"}}>
                     {name}
                  </CardTitle>
                  <CardText>
                     Description
                  </CardText>
                  <CardText className={roomIsFull ? "FullRoom" : ""}>
                     Participants: {participants.length}/{capacity}
                  </CardText>
                  <Button color={roomIsFull ? "secondary" : "primary"} onClick={this.joinRoom} disabled={roomIsFull}>
                     Join Room
                  </Button>
               </CardBody>
               {isPrivate && <input type="password" value={password} onChange={this.updateInputHandler} />}
            </Card>
            <Popover isOpen={!!errorMessage} placement="bottom" target={name} style={{color: "#272822"}}>
               <PopoverHeader>
                  {errorMessage}
               </PopoverHeader>
            </Popover> 
         </Fragment>
      )
   }
}

export default RoomThumbnail;