import React from "react";
import backgroundPic from"../../img/organize.png";

const JumboStyle = {
  backgroundImage: `url(${backgroundPic})`,
  backgroundSize: "cover",
  height: "500px",
  color: "#FFFFFF",
  textAlign: 'center',
  textDecoration: "underline"
}
const Jumbotron = ({ children }) =>
  <div style={ JumboStyle } className="jumbotron">
    {children}
  </div>;

export default Jumbotron;
