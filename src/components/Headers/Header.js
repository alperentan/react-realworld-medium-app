import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="parent-navbar">
        <div className="navbar-container">
          <NavLink className="navbar-logo" to="/">
            conduit
          </NavLink>
          <ul className="navbar">
            <li className="navbar-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>

            <li className="navbar-item">
              <NavLink className="nav-link" to="/login">
                Sign in
              </NavLink>
            </li>

            <li className="navbar-item">
              <NavLink className="nav-link" to="/register">
                Sign up
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
