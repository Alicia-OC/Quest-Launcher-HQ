import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar(userLogged) {
  let userName = "Alicia";

  if (userLogged) {
    return (
      <>
        <nav className="Navbar">
          <div className="NavbarItem-left" id="NavbarHome">
            {" "}
            <Link to="/">Home</Link>
          </div>
          <div className="NavbarItem-right" id="NavbarUser">
            <button className="NavbarButton">{userName}</button>
            <div class="dropdown-content">
              <Link to="/Profile">Profile</Link>
              <Link to="/Library">Library</Link>

              <Link to="/"> Log out</Link>
            </div>
          </div>
          <div className="NavbarItem-right" id="NavbarFav">
            <button className="NavbarButton">Favorite</button>
            <div class="dropdown-content">
              <Link to="/MongoDB">MongoDB list</Link>
            </div>
          </div>
          <div className="NavbarItem-right" id="NavbarNew">
            <button className="NavbarButton">New</button>
            <div class="dropdown-content">
              <Link to="/NewRequest">Request</Link>
              <Link to="/NewTemplate">Template</Link>
              <Link to="/NewTeam">Team</Link>
              <Link to="/NewGame">Game</Link>
              <Link to="/NewVendor">Vendor</Link>
            </div>
          </div>
        </nav>
      </>
    );
  } else {
    return (
      <>
        <nav className="Navbar">
          <div className="NavbarItem-left" id="NavbarHome">
            {" "}
            <Link to="/">Home</Link>
          </div>

          <div className="NavbarItem-right" id="loginNavbar">
            {" "}
            <Link to="/login">Log in </Link>
            <Link to="/register">New User</Link>

          </div>
        </nav>
      </>
    );
  }
}

function Header(props) {
  let userLogged = props.isUserLoged;

  return (
    <div>
      <header className="App-header">{Navbar(userLogged)} </header>
    </div>
  );
}

export default Header;
