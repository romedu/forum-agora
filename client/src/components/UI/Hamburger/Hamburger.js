import React from "react";
import "./Hamburger.css";

const Hamburger = props => (
   <div className={`Hamburger ${props.insideDrawer && "InsideHamburger"}`} onClick={props.toggleHandler}>
      <div></div>
      <div></div>
      <div></div>
   </div>
);

export default Hamburger;