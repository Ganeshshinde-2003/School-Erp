import React from "react";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import "./Navbar.css";
import SearchComponent from "./SearchComponent";
const Navbar = () => {
  return (
    <nav className="navbar flex justify-between items-center sticky top-0 z-20">
      <div className="flex items-center ml-4">
        <img src="assets/icons/navbar-logo.png" alt="logo" />
        <p className="text-white">Indian Public School</p>
      </div>
      <div>
        <SearchComponent />
      </div>
      <div className="flex mr-4 justify-around items-center gap-5">
        <select name="date" id="date" className="px-2 py-1 rounded-md">
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
