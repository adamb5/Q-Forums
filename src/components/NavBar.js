import React from "react";

import "./NavBar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="name">
          <text>Q-Forums</text>
        </div>
        <div className="nav-elements">
          <ul>
            <li>Home</li>
            <li>Blog</li>
            <li>Projects</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
