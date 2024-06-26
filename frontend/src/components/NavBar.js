import React from "react";
import "./NavBar.css";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {

  function refreshPage() {
    setTimeout (() => {
      window.location.reload(false);
    }, 0.0005);
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="name">
          <Link exact to="/" onClick={refreshPage}>
            Q-Forums
          </Link>
        </div>
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink exact to="/" onClick={refreshPage}>Home</NavLink>
            </li>
            
            <li>
              <NavLink exact to="/about">About</NavLink>
            </li>
            <li>
              <NavLink exact to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

