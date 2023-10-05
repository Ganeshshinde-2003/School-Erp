import React from "react";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import "./Navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar	flex justify-between items-center">
      <div className="flex items-center ml-4">
        <img src="assets/icons/navbar-logo.png" alt="logo" />
        <p className="text-white">Indian Public School</p>
      </div>
      <div>
        <input type="text" placeholder="search student" />
      </div>
      <div className="flex mr-4 justify-around items-center">
        <select name="date" id="date">
          <option value="2023-2024">2023-2024</option>
          <option value="2022-2023">2022-2023</option>
        </select>
        <img src="assets/icons/question-icon.png" alt="question" />
        <Avatar sx={{ bgcolor: deepPurple[500] }}>SA</Avatar>
      </div>
    </nav>
  );
};

export default Navbar;
