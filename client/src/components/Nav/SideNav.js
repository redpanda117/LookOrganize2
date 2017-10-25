import React from "react";
import "./Nav.css";

export const SideNav = () =>
 
  <ul className="nav-sidebar">
    <li className="active"><a href="/">Home<span className="sr-only">(current)</span></a></li>
    <li><a href="/Schedule">Schedule</a></li>
    <li><a href="/Finance">Finance</a></li>
    <li><a href="/notes">Notes</a></li>
  </ul>;